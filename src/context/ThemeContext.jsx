import React, { useState } from 'react'
export const ThemeContext = React.createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
      localStorage.setItem('mod', 'dark')
    } else {
      setTheme('light')
      localStorage.setItem('mod', 'light')
    }
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
