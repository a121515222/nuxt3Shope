const { compile } = require("vue");

module.exports = {
  env: {
    browser: true,
    es2023: true,
    "vue/setup-compiler-macros": true,
  },
  extends: ["@nuxtjs/eslint-config-typescript", "prettier"],
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: "module",
  },
  rules: {
    "no-undef": "off",
    "prettier/prettier": "error",
  },
};
