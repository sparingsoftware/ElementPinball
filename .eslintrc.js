module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:vue/recommended',
    'standard'
  ],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-multiple-empty-lines': ['error', { 'max': 2 }],
    'vue/html-closing-bracket-spacing': 0,
    'vue/no-v-html': 0,
    'vue/max-attributes-per-line': [2, {
      'singleline': 3,
      'multiline': {
        'max': 1,
        'allowFirstLine': false
      }
    }],
    'arrow-parens': 0
  },
  globals: {
    'Swiper': true
  }
}
