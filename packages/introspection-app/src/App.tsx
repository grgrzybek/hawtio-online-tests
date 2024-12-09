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
import React, { ReactNode, useState } from "react"

export const App: React.FunctionComponent = (): ReactNode => {

  const [ output, setOutput ] = useState("")

  const getEnv = () => {
    fetch("http://localhost:3000/env")
        .then(r => r.json())
        .then(j => {
          let v = "";
          Object.keys(j).forEach(k => {
            v += k + ": " + j[k] + "\n"
          })
          setOutput(v)
        })
  }

  const getStatus = () => {
    fetch("http://localhost:3000/status")
        .then(r => r.json())
        .then(j => {
          setOutput(JSON.stringify(j))
        })
  }

  return (
      <>
        <h1 className="main">Introspection App</h1>
        <div className="controls">
          <button id="get-env" onClick={getEnv}>Get Backend environment</button>
          <button id="get-status" onClick={getStatus}>Get Status</button>
        </div>
        <div className="display">{output}</div>
      </>
  )

}
