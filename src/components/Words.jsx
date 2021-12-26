import React from 'react'
import styles from '../scss/words.module.css'
import { Typography } from '@mui/material'

const Words = ({ data }) => {
  const themes = {
    dark: {
      color: '#E1E1E1',
      background: '#1E1E1E',
      transition: '1s ease',
    },
    light: {
      color: '#38454C',
      background: '#E1E1E1',
      transition: '1s ease',
    },
  }
  return (
    <div
      className={styles.words}
      style={
        localStorage.getItem('mod') === 'light' ? themes.dark : themes.light
      }
    >
      {data !== '' && (
        <Typography variant='h4'>
          {data.word} <br />
          Pronunciation: {data.pronunciation}
        </Typography>
      )}

      {data.definitions !== undefined &&
        data.definitions.map((def) => {
          return (
            <div className={styles.defs} key={Math.random() * 1000}>
              <Typography variant='h4'>{def.type}</Typography>
              <Typography variant='h5'>{def.emoji}</Typography>
              <Typography variant='h5'>{def.definition}</Typography>
              <Typography variant='h5'>{def.example}</Typography>
              {def.image_url !== null && (
                <img
                  src={def.image_url}
                  alt={def.image_url}
                  height='300'
                  width='300'
                ></img>
              )}
            </div>
          )
        })}
    </div>
  )
}

export default Words
