import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from 'react-email'

interface ContactNotificationEmailProps {
  name: string
  email: string
  message: string
  receivedAt: string
}

export default function ContactNotificationEmail({ name, email, message, receivedAt }: ContactNotificationEmailProps) {
  return (
    <Html lang='pt-BR' dir='ltr'>
      <Head />
      <Preview>Novo contato recebido pelo portfólio de Lucino Campos</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Text style={styles.eyebrow}>ALUCINADO.DEV / NOVO CONTATO</Text>
          <Heading style={styles.heading}>Uma nova mensagem chegou pelo portfólio.</Heading>
          <Text style={styles.meta}>Recebida em {receivedAt}</Text>

          <Hr style={styles.divider} />

          <Section style={styles.personSection}>
            <Text style={styles.label}>Nome</Text>
            <Text style={styles.value}>{name}</Text>
            <Text style={styles.label}>E-mail para resposta</Text>
            <Text style={styles.value}>{email}</Text>
          </Section>

          <Section style={styles.messageSection}>
            <Text style={styles.label}>Mensagem</Text>
            <Text style={styles.message}>{message}</Text>
          </Section>

          <Text style={styles.footer}>
            Responda diretamente a este e-mail para falar com a pessoa que enviou a mensagem.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const styles = {
  body: {
    backgroundColor: '#020611',
    color: '#cbd5e1',
    fontFamily: 'Arial, Helvetica, sans-serif',
    margin: 0,
    padding: '32px 12px',
  },
  container: {
    backgroundColor: '#07101e',
    border: '1px solid #183047',
    margin: '0 auto',
    maxWidth: '600px',
    padding: '32px',
  },
  eyebrow: {
    color: '#2dd4bf',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '2px',
    margin: '0 0 12px',
  },
  heading: {
    color: '#f8fafc',
    fontSize: '26px',
    lineHeight: '34px',
    margin: 0,
  },
  meta: {
    color: '#64748b',
    fontSize: '12px',
    margin: '12px 0 0',
  },
  divider: {
    borderColor: '#183047',
    margin: '28px 0',
  },
  personSection: {
    marginBottom: '24px',
  },
  messageSection: {
    backgroundColor: '#030814',
    borderLeft: '3px solid #22d3ee',
    padding: '18px 20px',
  },
  label: {
    color: '#64748b',
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '1.4px',
    margin: '0 0 5px',
    textTransform: 'uppercase' as const,
  },
  value: {
    color: '#e2e8f0',
    fontSize: '15px',
    lineHeight: '22px',
    margin: '0 0 18px',
  },
  message: {
    color: '#e2e8f0',
    fontSize: '15px',
    lineHeight: '24px',
    margin: 0,
    whiteSpace: 'pre-wrap' as const,
  },
  footer: {
    color: '#64748b',
    fontSize: '11px',
    lineHeight: '18px',
    margin: '24px 0 0',
  },
}
