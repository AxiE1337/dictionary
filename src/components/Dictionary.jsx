import React, { useState, useEffect } from 'react'
import Words from './Words'
import { useParams, useNavigate } from 'react-router-dom'
import styles from '../scss/dictionary.module.css'
import { TextField, IconButton, CircularProgress } from '@mui/material'
import { FaSearch } from 'react-icons/fa'

const Dictionary = () => {
  const word = useParams('bear')
  const navigate = useNavigate()
  const [inputState, setInputState] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState('')
  const Owlbot = require('owlbot-js')
  const client = Owlbot(process.env.REACT_APP_TOKEN)

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

  useEffect(() => {
    if (word.word !== undefined) {
      setIsLoading(true)
      Owlbot(process.env.REACT_APP_TOKEN)
        .define(word.word)
        .then((res) => {
          if (res !== undefined) {
            setData(res)
            setIsLoading(false)
          }
        })
        .catch((err) => {
          console.log(err.message)
          navigate('/')
          setIsLoading(false)
        })
    }
  }, [word.word, navigate, Owlbot])

  const getData = async (e) => {
    e.preventDefault()
    if (inputState !== '') {
      setIsLoading(true)
      try {
        const data = await client.define(inputState.toLocaleLowerCase())
        navigate(`/${inputState}`)
        setIsLoading(false)
        setData(data)
        setInputState('')
      } catch (err) {
        console.log(err.message)
        navigate('/')
        setIsLoading(false)
      }
    }
  }

  return (
    <>
      <div className={styles.main}>
        <form onSubmit={getData}>
          <TextField
            style={
              localStorage.getItem('mod') === 'light'
                ? themes.dark
                : themes.light
            }
            fullWidth
            variant='outlined'
            label='word...'
            value={inputState}
            onChange={(e) => {
              setInputState(e.target.value)
            }}
          ></TextField>
          <IconButton variant='primary' onClick={getData}>
            <FaSearch size='30' />
          </IconButton>
        </form>
      </div>
      {!isLoading ? (
        <Words data={data} />
      ) : (
        <div className={styles.loading}>
          <CircularProgress />
        </div>
      )}
    </>
  )
}

export default React.memo(Dictionary)
