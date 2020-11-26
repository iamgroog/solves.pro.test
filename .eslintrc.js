module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "plugin:nuxt/recommended"
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    // eslint-disable-next-line quotes
    "space-before-blocks": 0,
    quotes: ["error", "double"],
    "space-before-function-paren": 0,
    semi: 0,
    "eol-last": 0,
    "vue/name-property-casing": ["error", "kebab-case"],
    indent: 0
  }
}
