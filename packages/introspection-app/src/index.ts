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
// this uses style-loader
import "./index.css"
// import "./bootstrap"
import("./bootstrap")

// this uses css-loader
// import * as css from "./index.css"
// console.info("CSS", css)

// import * as rp from "module1/remoteplugin"
// const rp = "Hello"

// document.addEventListener("DOMContentLoaded", async () => {
//   document.getElementById("app")!.innerHTML = `
// <h1 class='main'>Patternfly + React + Webpack</h1>
// <div><button id="load-plugin">Load dynamically</button></div>
// <div id="for-plugin"></div>
// `
//   document.getElementById("load-plugin")!.addEventListener("click", async () => {
//     const rp = await import("module1/remoteplugin")
//     document.getElementById("for-plugin")!.innerHTML = JSON.stringify(rp.Plugin)
//   })
// })
