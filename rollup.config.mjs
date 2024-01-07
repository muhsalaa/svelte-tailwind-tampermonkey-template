import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import svelte from "rollup-plugin-svelte";
import postCSS from "rollup-plugin-postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import config from "./config.js";
import { createBanner } from "./utils.js";

const production = process.env.PRODUCTION === "true";
const outputDir = production ? "dist" : "debug";

export default {
  input: "src/main.ts",
  output: {
    sourcemap: true,
    format: "iife",
    name: config.name,
    file: `${outputDir}/build.min.js`,
    banner: createBanner(config.metadata),
  },
  plugins: [
    typescript({ sourceMap: !production }),
    svelte(),
    nodeResolve({ browser: true }),
    postCSS({
      extract: false,
      plugins: [tailwindcss, autoprefixer],
      config: false,
    }),
    replace({
      "process.env.NODE_ENV": production
        ? JSON.stringify("production")
        : JSON.stringify("development"),
      preventAssignment: true,
    }),
    // Dev server
    !production &&
      serve({
        open: true,
        verbose: true,
        contentBase: ["public", ""],
        host: "localhost",
        port: 3000,
      }),
    !production && livereload({ watch: "debug" }),
    // minification with terser on production
    production &&
      terser({
        output: {
          comments: async function (node, comment) {
            const whitelist = [
              "@name",
              "@namespace",
              "@copyright",
              "@version",
              "@description",
              "@icon",
              "@iconURL",
              "@defaulticon",
              "@icon64",
              "@icon64URL",
              "@grant",
              "@author",
              "@homepage",
              "@homepageURL",
              "@website",
              "@source",
              "@antifeature",
              "@require",
              "@resource",
              "@include",
              "@match",
              "@exclude",
              "@run-at",
              "@sandbox",
              "@connect",
              "@noframes",
              "@updateURL",
              "@downloadURL",
              "@supportURL",
              "@webRequest",
              "@unwrap",
            ];

            var text = comment.value;
            return new RegExp(
              `${whitelist.join("|")}|==UserScript==|==\/UserScript==`,
              "i"
            ).test(text);
          },
        },
      }),
  ],
};
