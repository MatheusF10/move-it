import { useContext } from 'react';
import { challengesContext } from '../context/ChallengeContext';
import { CountdownContext, CountdownProvider } from '../context/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css'

export default function ChallengeBox() {
    const { activeChallenge, resetChallenge, completeChallenge } = useContext(challengesContext)
    const { resetCountdown } = useContext(CountdownContext)
    function handleChallengeSucceceded(){
        completeChallenge()
        resetCountdown()
    }
    function handleChallengeFailed(){
        resetChallenge();
        resetCountdown();
    }

    return (
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>{activeChallenge.amount}xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="" />
                        <strong>Novo Desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button type="button" className={styles.challengeFailedButton} onClick={handleChallengeFailed}>Falhei</button>
                        <button type="button" className={styles.challengeSuccecedButton} onClick={handleChallengeSucceceded}>Completei</button>
                    </footer>

                </div>
            ) : (
                    <div className={styles.challengeNotActive}>
                        <strong>Finalize um ciclo para receber um desafio.</strong>
                        <p>
                            <img src="icons/level-up.svg" alt="" />
                    Avance de level completando desafios.
                </p>
                    </div>
                )}
        </div>
    )
}