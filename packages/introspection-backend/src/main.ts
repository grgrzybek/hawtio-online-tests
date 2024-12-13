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

import cors from "cors"
import express from "express"
import helmet from "helmet"
import { exec, ExecException } from "node:child_process"

console.info("Introspection Backend starting...")

const port = 3000
const app = express()

app.use(helmet())
app.use(cors())

app.get("/*", (req, _res, next) => {
  console.log(req.headers)
  next()
})
app.get("/status", (_req, res) => {
  res.setHeader("Content-Type", "application/json")
  res.status(200).json({ port: port })
})

app.get("/env", (_req, res) => {
  res.setHeader("Content-Type", "application/json")
  const r: Record<string, string> = {};
  Object.keys(process.env).sort().forEach((v) => {
    r[v] = process.env[v]!
  })
  res.status(200).json(r)
})

app.get("/netinfo", (_req, res) => {
  res.setHeader("Content-Type", "text/plain")
  exec("ip a", (error: ExecException | null, stdout: string, _stderr: string) => {
    if (error) {
      res.status(200).send(error.message)
    } else {
      res.status(200).send(stdout)
    }
  })
})

app.get("/ss", (_req, res) => {
  res.setHeader("Content-Type", "text/plain")
  exec("ss -lnpa", (error: ExecException | null, stdout: string, _stderr: string) => {
    if (error) {
      res.status(200).send(error.message)
    } else {
      res.status(200).send(stdout)
    }
  })
})

const server = app.listen(port, "0.0.0.0", () => {
  console.info(`Listening at http://localhost:${port}`)
  console.info("PID", process.pid)
})

process.on("SIGINT", cleanup)
process.on("SIGTERM", cleanup)

function cleanup() {
  console.info("Introspection Backend stopping...")
  // https://nodejs.org/api/net.html#serverclosecallback
  server.close((error?: Error) => {
    if (error) {
      if (error.message) {
        console.warn("Problem shutting down express", error.message)
      } else {
        console.warn("Problem shutting down express", error.name)
      }
    }
    console.info("Introspection Backend stopped")
    process.exit(0)
  })
}
