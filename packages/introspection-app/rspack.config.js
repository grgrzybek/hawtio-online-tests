/*
 * Copyright 2024 Grzegorz Grzybek
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import rspack from "@rspack/core"
import path from "node:path"

const mode = "development"

const config = {
  mode: mode,
  target: "web",
  entry: {
    main: './src/index.ts',
  },
  resolve: {
    tsConfig: {
      configFile: path.resolve("./tsconfig.json")
    },
    extensions: [ ".ts", ".tsx", ".js" ]
  },
  output: {
    clean: mode !== "development",
    path: path.resolve("./dist")
  },
  stats: {
    preset: "errors-warnings",
    assets: true,
    chunks: true,
    chunkModules: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "builtin:swc-loader",
          /** @type {import('@rspack/core').SwcLoaderOptions} */
          options: {
            jsc: {
              parser: {
                syntax: "typescript",
                jsx: true
              },
              target: "esnext"
            }
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader", options: { injectType: "linkTag" } },
          { loader: "file-loader" },
        ],
      }
    ]
  },
  plugins: [
    new rspack.ProgressPlugin({
      prefix: "|",
      template: "{prefix:.bold}{bar:50.green/white.dim}{prefix:.bold} ({percent}%) {wide_msg:.dim}",
      progressChars: "#=·"
    }),
    new rspack.HtmlRspackPlugin({
      template: path.resolve("public/index.html"),
      favicon: path.resolve("public/images/icon.png"),
      inject: "body",
      minify: false
    })
  ],
  optimization: {
    minimizer: mode !== "development" ? [
      new rspack.LightningCssMinimizerRspackPlugin()
    ] : []
  },
}

export default config
