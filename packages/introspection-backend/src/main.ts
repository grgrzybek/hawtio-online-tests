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

console.info("Introspection Backend starting...")

const port = 3000
const server = express()

server.use(helmet())
server.use(cors())

server.get('/*', (req, _res, next) => {
  console.log(req.headers)
  next()
})
server.get('/status', (_req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.status(200).json({ port: port })
})

server.get('/env', (_req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const r: Record<string, string> = {};
  Object.keys(process.env).sort().forEach((v) => {
    r[v] = process.env[v]!
  })
  res.status(200).json(r)
})

server.listen(port, "0.0.0.0", () => {
  console.info(`Listening at http://localhost:${port}`)
})
