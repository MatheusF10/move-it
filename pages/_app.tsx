import { useState } from 'react'
import '../src/styles/global.css'
import ChallengeProvider, { challengesContext } from '../src/context/ChallengeContext'
import { CountdownProvider } from '../src/context/CountdownContext'

function MyApp({ Component, pageProps }) {
  
  return (
      <Component {...pageProps} />
    )
  
}

export default MyApp
