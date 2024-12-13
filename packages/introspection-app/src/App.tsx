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
  const [ error, setError ] = useState(false)

  const getEnv = () => {
    fetch("/management/env", { cache: "no-cache", headers: { "Cache-Control": "no-cache" } })
        .then(r => r.json())
        .then(j => {
          let v = "";
          Object.keys(j).forEach(k => {
            v += k + ": " + j[k] + "\n"
          })
          setError(false)
          setOutput(v)
        })
        .catch(e => {
          setError(true)
          setOutput(e instanceof Error ? e.message : (e ? e.toString : "error occurred"))
        })
  }

  const getStatus = () => {
    fetch("/management/status")
        .then(r => r.json())
        .then(j => {
          setError(false)
          setOutput(JSON.stringify(j))
        })
        .catch(e => {
          setError(true)
          setOutput(e instanceof Error ? e.message : (e ? e.toString : "error occurred"))
        })
  }

  const getNetInfo = () => {
    fetch("/management/netinfo")
        .then(r => r.text())
        .then(j => {
          setError(false)
          setOutput(j)
        })
        .catch(e => {
          setError(true)
          setOutput(e instanceof Error ? e.message : (e ? e.toString : "error occurred"))
        })
  }

  return (
      <>
        <h1 className="main">Introspection App</h1>
        <div className="controls">
          <button id="get-env" onClick={getEnv}>Get Backend Environment</button>
          <button id="get-status" onClick={getStatus}>Get Status</button>
          <button id="get-netinfo" onClick={getNetInfo}>Get Net Information</button>
        </div>
        <div className={error ? "display error" : "display"}>{output}</div>
      </>
  )

}
