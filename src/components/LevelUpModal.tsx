import { useContext } from 'react'
import { challengesContext } from '../context/ChallengeContext'
import styles from '../styles/components/LevelUpModal.module.css'

export default function LevelUpModal(){
    const { level } = useContext(challengesContext)
    const { closeModal } = useContext(challengesContext)


    return(
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{level}</header>

                <strong>Parabéns</strong>
                <p>Você alcançou um novo level.</p>

                <button type='button' onClick={closeModal}>
                    <img src="/icons/close.svg" alt=""/>
                </button>
            </div>
        </div>
        
    )
}