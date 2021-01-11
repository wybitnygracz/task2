module.exports = {
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: ['.eslintrc.js'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'linebreak-style': 0,
    'implicit-arrow-linebreak': 0, 
    'operator-linebreak': 0,
    'react-hooks/exhaustive-deps': 0,
    'arrow-parens': 1,
    'object-curly-newline': 0,
    'react/no-unescaped-entities': 0,
    'react/jsx-one-expression-per-line': 0,
    '@typescript-eslint/no-shadow': 1,
    '@typescript-eslint/explicit-module-boundary-types': 0,
  },
};
