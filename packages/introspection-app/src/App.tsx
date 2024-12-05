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
import React, { ReactNode, useEffect, useState } from "react"

export const App: React.FunctionComponent = (): ReactNode => {

  const [ time, setTime ] = useState(Math.floor(Date.now() / 1000))

  useEffect(() => {
    const handle = window.setInterval(() => {
      let ts = Math.floor(Date.now() / 1000)
      // console.info("TS", ts)
      setTime(ts)
    }, 1000)
    return () => {
      window.clearInterval(handle)
    }
  }, [time])

  return (
      <div>
        TS: <span className="timer">{time}</span>
      </div>
  )

}
