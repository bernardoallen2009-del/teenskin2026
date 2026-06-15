import next from "eslint-config-next";

const config = [
  ...next,
  {
    ignores: [".next/**", "dist/**", "node_modules/**", "tmp/**"]
  }
];

export default config;
