import path from "path";

import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import alias from "@rollup/plugin-alias";

import packageJson from "./package.json";

const isDevelopment = process.env.NODE_ENV === "development",
  isProduction = process.env.NODE_ENV === "production",
  sourcemap = isDevelopment ? "inline" : "hidden",
  extensions = [".js", ".jsx", ".es6", ".es", ".mjs", ".ts"],
  projectRootDir = path.resolve(__dirname);

const commonOutput = [
    {
      file: packageJson.browser,
      format: "iife",
      sourcemap,
      name: "zUtils",
      banner: "/*! util-store version " + packageJson.version + " */",
      footer: "/*! Author: " + packageJson.author + " */",
    },
  ],
  buildOutput = [
    {
      file: "dist/util-store.umd.js",
      format: "umd",
      sourcemap,
      name: "zUtils",
    },
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap,
    },
    {
      file: packageJson.module,
      format: "es",
      sourcemap,
    },
  ],
  output = isProduction ? buildOutput.concat(commonOutput) : commonOutput;

export default async () => {
  return {
    input: "src/index.ts",
    output,
    plugins: [
      json(),
      commonjs(),
      babel({
        extensions,
        babelHelpers: "runtime",
        exclude: "**/node_modules/**",
      }),
      alias({
        entries: [
          {
            find: "src",
            replacement: path.resolve(projectRootDir, "src"),
          },
          {
            find: "utils",
            replacement: path.resolve(projectRootDir, "src/utils"),
          },
          {
            find: "proxyEvent",
            replacement: path.resolve(projectRootDir, "src/proxyEvent"),
          },
          {
            find: "systemInfo",
            replacement: path.resolve(projectRootDir, "src/systemInfo"),
          },
          {
            find: "type",
            replacement: path.resolve(projectRootDir, "src/type"),
          },
        ],
      }),
      resolve({
        extensions,
        mainFields: ["jsnext:main"],
      }),
      isProduction &&
        (await import("rollup-plugin-terser")).terser({
          output: {
            comments: /^!/,
          },
        }),
    ],
  };
};