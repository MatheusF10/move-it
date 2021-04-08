
import * as Icon from 'react-feather'
import { useState, useEffect, useContext } from 'react'
import styles from '../styles/components/Countdown.module.css'
import { challengesContext } from '../context/ChallengeContext'
import {CountdownContext} from '../context/CountdownContext'



export default function Countdown(){
    const { minutes, seconds, hasFinished, isActive, resetCountdown, startCountdown } = useContext(CountdownContext)
    const { activeChallenge } = useContext(challengesContext)
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

   
    return(
        <>
        <div className={styles.countdownContainer}>
            <div>
                <span>{minuteLeft}</span>
                <span>{minuteRight}</span>
            </div>
            <span>:</span>
            <div>
                <span>{secondLeft}</span>
                <span>{secondRight}</span>
            </div>
        </div>
        {hasFinished ?(
            <button disabled onClick={resetCountdown} type="button" className={styles.countdownButton}>
            Ciclo Encerrado &ensp;<Icon.Check color={'#4CD62B'}></Icon.Check>
            </button> 
        ) : (
            <>
                 { isActive ? (
            <button onClick={resetCountdown} type="button" className={`${styles.countdownButton} ${styles.countdownButtonActive}`}>
            Abandonar Ciclo &ensp; <Icon.X></Icon.X>
            </button> 
            ): 
            ( <button onClick={startCountdown} type="button" className={styles.countdownButton}>
            Iniciar Ciclo &ensp; <Icon.Play color="white"></Icon.Play>
            </button>)
        }
            </>
        )}

       
        </>
    )
}