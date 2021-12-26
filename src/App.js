import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Dictionary from './components/Dictionary'
import NavBar from './components/NavBar'
import Words from './components/Words'
import { ThemeContext } from './context/ThemeContext'

function App() {
  const { theme } = useContext(ThemeContext)

  const themes = {
    dark: {
      color: '#E1E1E1',
      background: '#121212',
      transition: '1s ease',
    },
    light: {
      color: '#121212',
      background: '#E1E1E1',
      transition: '1s ease',
    },
  }
  return (
    <div
      className='app'
      style={
        localStorage.getItem('mod') === 'light' && theme
          ? themes.dark
          : themes.light
      }
    >
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Dictionary />}>
            <Route path=':word' element={<Words />} />
          </Route>
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
