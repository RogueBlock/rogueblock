import { createContext, useEffect, useState } from 'react'

export interface IGlobalStore {}

const GlobalStoreContext = createContext<IGlobalStore>(null)

export function GlobalStoreProvider({ children }) {
  return (
    <GlobalStoreContext.Provider value={{}}>
      {children}
    </GlobalStoreContext.Provider>
  )
}

export default GlobalStoreContext
