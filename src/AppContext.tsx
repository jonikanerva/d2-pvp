import React, { createContext, ReactNode, useState } from 'react'

interface AppState {
  compActivities: string[] | undefined
  setCompActivities: (compActivities: string[] | undefined) => void
}

export const AppContext = createContext<AppState | undefined>(undefined)

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [compActivities, setCompActivities] = useState<string[] | undefined>(
    undefined,
  )

  const value = { compActivities, setCompActivities }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
