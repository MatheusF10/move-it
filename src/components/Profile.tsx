import styles from '../styles/components/Profile.module.css'
import { useContext } from 'react'
import { challengesContext } from '../context/ChallengeContext'
export default function Profile() {
    const { level, levelUp } = useContext(challengesContext)
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/MatheusF10.png" alt="" />
            <div>
                <strong>Matheus Ferraz</strong>

                <p>
                    <img src="icons/level.svg" alt="" />
                Level {level}
            </p>
            </div>

        </div>
    )
}