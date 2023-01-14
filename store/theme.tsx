import { createContext } from 'react'

type themeType = { theme: boolean; setTheme: any }
export const ThemeContext = createContext<themeType | null>(null)

export default ThemeContext.Provider
