module.exports = [
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: require('eslint-plugin-react'),
      'react-hooks': require('eslint-plugin-react-hooks'),
      prettier: require('eslint-plugin-prettier'),
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    // Avoid using `extends` in a flat config. Enable a small set of base rules
    // and rely on Prettier as an error via the plugin rule.
    rules: {
      'prettier/prettier': 'error',
    },
  },
];
