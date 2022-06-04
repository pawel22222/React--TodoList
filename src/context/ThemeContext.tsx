import { createContext, FC, useState } from 'react'
import { ThemeMode as TM } from '../global/Types'

type IThemeContext = {
  mode: TM
  setMode: () => void
}

const defaultState = {
  mode: TM.Dark,
  setMode: () => ({}),
}

export const ThemeContext = createContext<IThemeContext>(defaultState)

const ThemeProvider: FC = ({ children }) => {
  const [mode, setMode] = useState(TM.Dark)

  return (
    <ThemeContext.Provider
      value={{
        mode: mode,
        setMode: () => setMode(mode === TM.Dark ? TM.Light : TM.Dark),
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
