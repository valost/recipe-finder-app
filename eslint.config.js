import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
  
//   "plugin:prettier/recommended"
// ];

const extendedConfigs = compat.extends("next/core-web-vitals", "next/typescript");
console.log(extendedConfigs); // Check what this returns
const eslintConfig = [
  ...extendedConfigs,
  "plugin:prettier/recommended"
];

export default eslintConfig;
