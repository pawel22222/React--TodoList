import { createContext, useState } from 'react'

export const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
    const [mode, setMode] = useState('dark')

    return (
        <ThemeContext.Provider
            value={ {
                mode,
                setMode: () => setMode(mode === 'dark' ? 'light' : 'dark')
            } }
        >
            { children }
        </ThemeContext.Provider >
    )
}

export default ThemeProvider
