import { createContext, FC, useState } from 'react'

type IThemeContext = {
    mode: string,
    setMode: () => void
}

const defaultState = {
    mode: 'dark',
    setMode: () => { }
}

export const ThemeContext = createContext<IThemeContext>(defaultState)

const ThemeProvider: FC = ({ children }) => {
    const [mode, setMode] = useState('dark')

    return (
        <ThemeContext.Provider
            value={{
                mode: mode,
                setMode: () => setMode(mode === 'dark' ? 'light' : 'dark')
            }}
        >
            {children}
        </ThemeContext.Provider >
    )
}

export default ThemeProvider
