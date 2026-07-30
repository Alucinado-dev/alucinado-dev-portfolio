import { spawn } from 'node:child_process'
import { randomBytes } from 'node:crypto'
import { createServer } from 'node:http'

try {
  process.loadEnvFile('.env.local')
} catch (error) {
  if (error?.code !== 'ENOENT') throw error
}

const clientId = process.env.SPOTIFY_CLIENT_ID?.trim()
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET?.trim()
const redirectUriValue = process.env.SPOTIFY_REDIRECT_URI?.trim()

const missingVariables = [
  ['SPOTIFY_CLIENT_ID', clientId],
  ['SPOTIFY_CLIENT_SECRET', clientSecret],
  ['SPOTIFY_REDIRECT_URI', redirectUriValue],
]
  .filter(([, value]) => !value)
  .map(([name]) => name)

if (missingVariables.length > 0) {
  console.error(`Variáveis ausentes em .env.local: ${missingVariables.join(', ')}`)
  process.exit(1)
}

const redirectUri = new URL(redirectUriValue)

if (redirectUri.protocol !== 'http:' || redirectUri.hostname !== '127.0.0.1' || !redirectUri.port) {
  console.error('SPOTIFY_REDIRECT_URI deve usar o formato http://127.0.0.1:PORTA/callback')
  process.exit(1)
}

const port = Number(redirectUri.port)
const callbackPath = redirectUri.pathname

if (process.argv.includes('--check')) {
  console.log('Configuração local do Spotify válida. Nenhum segredo foi exibido e nenhuma chamada externa foi feita.')
  process.exit(0)
}

const state = randomBytes(24).toString('hex')
const scopes = ['user-read-currently-playing', 'user-read-recently-played']

const authorizationUrl = new URL('https://accounts.spotify.com/authorize')
authorizationUrl.search = new URLSearchParams({
  response_type: 'code',
  client_id: clientId,
  scope: scopes.join(' '),
  redirect_uri: redirectUri.toString(),
  state,
  show_dialog: 'true',
}).toString()

const browserResponse = (status, title, message) => `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'" />
    <title>${title}</title>
    <style>
      :root { color-scheme: dark; font-family: system-ui, sans-serif; }
      body { min-height: 100vh; margin: 0; display: grid; place-items: center; background: #010205; color: #e2e8f0; }
      main { width: min(520px, calc(100% - 48px)); border: 1px solid #1e293b; background: #050b16; padding: 32px; }
      strong { color: ${status === 'success' ? '#5eead4' : '#fda4af'}; }
      p { line-height: 1.7; color: #94a3b8; }
    </style>
  </head>
  <body>
    <main>
      <strong>${title}</strong>
      <p>${message}</p>
    </main>
  </body>
</html>`

const server = createServer(async (request, response) => {
  const requestUrl = new URL(request.url ?? '/', redirectUri.origin)

  if (requestUrl.pathname !== callbackPath) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('Não encontrado')
    return
  }

  const receivedState = requestUrl.searchParams.get('state')
  const code = requestUrl.searchParams.get('code')
  const spotifyError = requestUrl.searchParams.get('error')

  if (spotifyError || !code || receivedState !== state) {
    response.writeHead(400, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    })
    response.end(
      browserResponse(
        'error',
        'Autorização não concluída',
        'Volte ao terminal, execute o comando novamente e confirme as permissões solicitadas.',
      ),
    )
    console.error('O Spotify recusou a autorização ou o parâmetro state não correspondeu.')
    server.close()
    process.exitCode = 1
    return
  }

  try {
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri.toString(),
      }),
      signal: AbortSignal.timeout(10_000),
    })

    const tokenPayload = await tokenResponse.json()
    const refreshToken = tokenPayload?.refresh_token

    if (!tokenResponse.ok || typeof refreshToken !== 'string' || refreshToken.length === 0) {
      throw new Error(`Spotify respondeu com status ${tokenResponse.status} sem um refresh token.`)
    }

    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    })
    response.end(
      browserResponse(
        'success',
        'Spotify conectado',
        'O refresh token foi exibido somente no terminal. Copie as duas variáveis indicadas e depois feche esta aba.',
      ),
    )

    console.log('\nAutorização concluída. Adicione estas linhas ao .env.local:\n')
    console.log(`SPOTIFY_REFRESH_TOKEN=${refreshToken}`)
    console.log(`SPOTIFY_AUTHORIZED_AT=${new Date().toISOString().slice(0, 10)}`)
    console.log('\nNão envie esses valores pelo chat e não os adicione ao Git.\n')
    server.close()
  } catch (error) {
    response.writeHead(502, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    })
    response.end(
      browserResponse(
        'error',
        'Falha ao conectar com o Spotify',
        'Confira o terminal para obter a categoria técnica da falha e tente novamente.',
      ),
    )
    console.error(error instanceof Error ? error.message : 'Falha desconhecida ao obter o refresh token.')
    server.close()
    process.exitCode = 1
  }
})

server.on('error', error => {
  if (error.code === 'EADDRINUSE') {
    console.error(`A porta ${port} já está em uso.`)
    console.error('Recomendação: use http://127.0.0.1:8888/callback no painel do Spotify e no .env.local.')
  } else {
    console.error(error.message)
  }
  process.exitCode = 1
})

server.listen(port, '127.0.0.1', () => {
  console.log(`Aguardando autorização em ${redirectUri.origin}${callbackPath}`)
  console.log('Abrindo o Spotify no navegador...')
  console.log(`Se o navegador não abrir, acesse:\n${authorizationUrl.toString()}\n`)

  const browserProcess = spawn('explorer.exe', [authorizationUrl.toString()], {
    detached: true,
    stdio: 'ignore',
    windowsHide: true,
  })
  browserProcess.unref()
})

const timeout = setTimeout(
  () => {
    console.error('A autorização expirou após cinco minutos. Execute o comando novamente.')
    server.close()
    process.exitCode = 1
  },
  5 * 60 * 1000,
)

timeout.unref()
