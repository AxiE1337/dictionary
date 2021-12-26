import React, { useState, useEffect } from 'react'
import Words from './Words'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import styles from '../scss/dictionary.module.css'
import { TextField, IconButton, CircularProgress, Button } from '@mui/material'
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
      color: '#E1E1E1',
      background: '#E1E1E1',
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

  const randomWordHandler = async (e) => {
    e.preventDefault()
    try {
      const randomWordData = await axios.get(
        'https://random-word-api.herokuapp.com/word?number=1&swear=0'
      )
      getDataRandom(e, randomWordData.data[0])
    } catch (err) {
      console.log(err.message)
    }
  }

  const getData = async (e, value) => {
    e.preventDefault()
    if (inputState !== '') {
      setIsLoading(true)
      try {
        const data = await client.define(value.toLocaleLowerCase())
        navigate(`/${value}`)
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

  const getDataRandom = async (e, value) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const data = await client.define(value)
      navigate(`/${value}`)
      setIsLoading(false)
      setData(data)
    } catch (err) {
      randomWordHandler(e)
      console.log(err.message)
      navigate('/')
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className={styles.main}>
        <form onSubmit={(e) => getData(e, inputState)}>
          <TextField
            style={
              localStorage.getItem('mod') === 'light'
                ? themes.dark
                : themes.light
            }
            fullWidth
            variant='filled'
            label='word...'
            value={inputState}
            onChange={(e) => {
              setInputState(e.target.value)
            }}
          ></TextField>
          <IconButton variant='primary' onClick={(e) => getData(e, inputState)}>
            <FaSearch size='30' />
          </IconButton>
        </form>
        <Button variant='primary' onClick={(e) => randomWordHandler(e)}>
          Random word
        </Button>
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
