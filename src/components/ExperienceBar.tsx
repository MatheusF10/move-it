import React, { useContext } from 'react'
import {useState} from 'react'
import { challengesContext } from '../context/ChallengeContext'
import styles from '../styles/components/ExperienceBar.module.css'

export default function ExperienceBar(){
    const { currentExperience, experienceToNextLevel } = useContext(challengesContext)
    
    const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;
    
    return (
        <header className={styles.experienceBar}>
            <span>0xp</span>
            <div>
                <div style={{width: `${percentToNextLevel}%` }}/>
                <span className={styles.currentExperience} style={{left: `${percentToNextLevel}%`}}>{currentExperience}xp</span>
            </div>
            <span>{experienceToNextLevel}xp</span>
        </header>
        )
 }
    