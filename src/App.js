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

  console.log(theme)

  const themes = {
    dark: {
      color: 'white',
      background: '#445760',
      transition: '1s ease',
    },
    light: {
      color: '#445760',
      background: 'white',
      transition: '1s ease',
    },
  }
  return (
    <div
      className='app'
      style={
        localStorage.getItem('mod') === 'light' ? themes.dark : themes.light
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
