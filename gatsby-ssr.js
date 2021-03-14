import React from "react"

import VariablesProvider from "./src/components/Layout/VariablesProvider"
export const wrapRootElement = ({ element }) => (
  <VariablesProvider>{element}</VariablesProvider>
)
