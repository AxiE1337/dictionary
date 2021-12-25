import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import styles from '../scss/navbar.module.css'
import { Button } from '@mui/material'

const NavBar = () => {
  const { toggleTheme } = useContext(ThemeContext)

  const themes = {
    dark: {
      color: 'white',
      background: '#38454C',
      transition: '1s ease',
    },
    light: {
      color: '#38454C',
      background: 'white',
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
