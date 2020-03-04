module.exports = {
  root: true,
  env: {
      node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
      ecmaVersion: 2019,
      sourceType: 'module',
      project: './tsconfig.json',
  },
  extends: ['prettier'],
  plugins: ['@typescript-eslint/tslint', 'prettier'],
  rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/tslint/config': [
          2,
          {
              lintFile: './tslint.json',
          },
      ],
  },
};
