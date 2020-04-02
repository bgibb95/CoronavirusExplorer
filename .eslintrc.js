module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  ignorePatterns: ['**/scripts/*.min.js'],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {}
}
