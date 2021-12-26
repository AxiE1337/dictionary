import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import styles from '../scss/navbar.module.css'
import { Button } from '@mui/material'

const NavBar = () => {
  const { toggleTheme } = useContext(ThemeContext)

  const themes = {
    dark: {
      color: '#E1E1E1',
      background: '#2E2E2E',
      transition: '1s ease',
    },
    light: {
      color: '#2E2E2E',
      background: '#E1E1E1',
      transition: '1s ease',
    },
  }

  return (
    <div
      className={styles.navbar}
      style={
        localStorage.getItem('mod') === 'light' ? themes.dark : themes.light
      }
    >
      <Button variant='primary' onClick={() => toggleTheme()}>
        {localStorage.getItem('mod') || 'light'}
      </Button>
    </div>
  )
}

export default NavBar
