import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";

export default [
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" },
  },
  { languageOptions: { globals: globals.node }, },
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/essential"]
];
