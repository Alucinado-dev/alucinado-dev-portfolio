import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettierConfig from 'eslint-config-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'

const eslintConfig = defineConfig([
  // Configurações base do Next.js (acessibilidade, imagens, performance, etc.)
  ...nextVitals,
  ...nextTs,

  // Regras extras para TS/TSX
  {
    files: ['**/*.{ts,tsx}'],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { project: true },
    },
    rules: {
      'prefer-const': 'error', // força const onde let não é necessário
      'no-console': ['warn', { allow: ['warn', 'error'] }], // avisa sobre console.log esquecido

      // Boas práticas de TS sem ser excessivo
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    },
  },

  // Regras para JS puro (arquivos de config, scripts)
  {
    files: ['**/*.{js,mjs,cjs}'],
  },

  // Ignorar pastas geradas — DEVE ser o padrão do Next
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', '.husky/**']),

  // SEMPRE por último: desativa regras que conflitam com Prettier
  prettierConfig,
])

export default eslintConfig
