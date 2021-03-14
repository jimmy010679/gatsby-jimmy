import React, { useState, createContext } from "react"

// -----------------------------------------------------------------------------------------------------------------------
// Context
export const VariablesContext = createContext({
  // template ------------------------------------------------------
  templateState: false,
  setTemplateState: () => {},
})

// -----------------------------------------------------------------------------------------------------------------------
// Provider
const VariablesProvider = props => {
  const [templateState, setTemplateState] = useState(undefined)

  const value = {
    templateState,
    setTemplateState,
  }

  return (
    <VariablesContext.Provider value={value}>
      {props.children}
    </VariablesContext.Provider>
  )
}

export default VariablesProvider
