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

import resolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import commonjs from "@rollup/plugin-commonjs"
import terser from "@rollup/plugin-terser"
import json from "@rollup/plugin-json"

const defaultOutput = {
  name: "Introspection",
  indent: false,
  sourcemap: true
}

const config = {
  input: "src/main.ts",
  plugins: [ typescript({ include: [ "src/*" ] }), json(), resolve({ preferBuiltins: true }), commonjs() ],
  output: [
    {
      ...defaultOutput,
      format: "cjs",
      file: `dist/main.cjs`
    },
    {
      ...defaultOutput,
      file: `dist/main.min.cjs`,
      format: "cjs",
      plugins: [ terser() ]
    },
    {
      ...defaultOutput,
      file: `dist/main.mjs`,
      format: "esm"
    }
  ]
}

export default [ config ]
