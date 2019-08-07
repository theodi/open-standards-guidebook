module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "@vue/airbnb",
    "plugin:vue/recommended",
    "plugin:prettier/recommended",
    "prettier/vue",
  ],
  plugins: ["vue", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "no-console": process.env.NODE_ENV === "production" ? 2 : 0,
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    "import/extensions": 0,
    "import/prefer-default-export": 0,
  },
  parserOptions: {
    parser: "babel-eslint",
  },
};
