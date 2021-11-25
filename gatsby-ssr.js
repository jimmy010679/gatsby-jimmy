import React from "react"

import VariablesProvider from "./src/components/layout/variablesProvider"
export const wrapRootElement = ({ element }) => (
  <VariablesProvider>{element}</VariablesProvider>
)
