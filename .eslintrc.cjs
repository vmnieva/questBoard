module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["eslint:recommended"],
  overrides: [
    {
      files: ["**/*.svelte"],
      processor: "svelte3/svelte3"
    }
  ],
  plugins: ["svelte3"],
  settings: {
    "svelte3/preprocess": true
  },
  ignorePatterns: ["node_modules"]
};
