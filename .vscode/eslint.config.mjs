import js from '@eslint/js'
import globals from 'globals'
import jsoncParser from 'jsonc-eslint-parser'
import * as json from 'eslint-plugin-json-es'
import markdown from 'eslint-plugin-markdown'
import css from 'eslint-plugin-css'
import prettierConfig from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default [
  // Configuração principal para arquivos JavaScript
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    // A nova forma de usar as regras recomendadas
    ...[js.configs.recommended],
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },

  // Sobrescreve para arquivos .js usarem CommonJS
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },

  // Configuração para arquivos JSON
  {
    files: ['**/*.json', '**/*.jsonc', '**/*.json5'],
    languageOptions: {
      parser: jsoncParser,
    },
    plugins: { json },
    rules: {
      ...json.configs.recommended.rules,
    },
  },

  // Configuração para Markdown
  ...markdown.configs.recommended,

  // Configuração para CSS
  ...css.configs.recommended,

  // Configuração para TypeScript
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { project: true },
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },

  // Esta deve ser a ÚLTIMA configuração. Desativa regras do ESLint que conflitam com o Prettier.
  prettierConfig,
]
