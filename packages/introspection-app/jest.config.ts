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
// https://jestjs.io/docs/configuration

import type { Config } from 'jest'

const config: Config = {

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Make calling deprecated APIs throw helpful error messages
  errorOnDeprecated: true,

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  // moduleNameMapper: {},

  // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
  // modulePathIgnorePatterns: [],

  // A preset that is used as a base for Jest's configuration
  // preset: undefined,

  // A map from regular expressions to paths to transformers
  // transform: undefined,
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  // transformIgnorePatterns: [
  //   "/node_modules/",
  //   "\\.pnp\\.[^\\/]+$"
  // ],

  // Indicates whether each individual test should be reported during the run
  verbose: true,

};

export default config
