module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars": process.env.NODE_ENV === "production" ? "warn" : "warn",
    "no-unused-labels": "off",
    "no-const-assign": "off",
    "no-undef": "warn",
    "vue/no-unused-components":
      process.env.NODE_ENV === "production" ? "error" : "warn",
    "prettier/prettier": [
      "warn",
      {
        singleQuote: false,
        trailingComma: "es5",
        bracketSpacing: true,
        jsxBracketSameLine: true,
        arrowParens: "always",
      },
    ],
  },
};
