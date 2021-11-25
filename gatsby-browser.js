import React from "react"
import VariablesProvider from "./src/components/layout/variablesProvider"

import "./src/styles/global.css"
import "./src/styles/highlight.css"

// Include PrismJS CSS
require("prismjs/themes/prism-tomorrow.css")
require("prismjs/plugins/line-numbers/prism-line-numbers.css")
require("prismjs/plugins/command-line/prism-command-line.css")

export const wrapRootElement = ({ element }) => (
  <VariablesProvider>{element}</VariablesProvider>
)
