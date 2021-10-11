module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'vue/require-prop-types': 0,
    'vue/require-default-prop': 0,
    'vue/no-mutating-props': 0,
    'vue/no-v-html': 0
  }
}
