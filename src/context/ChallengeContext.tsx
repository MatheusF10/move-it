import { Children, useState, ReactNode, useEffect } from 'react'
import { createContext } from 'react'
import Cookie from 'js-cookie'
import challenges from '../../challenges.json'
import LevelUpModal from '../components/LevelUpModal'



interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount:number;
}

interface ChallengesContextData{
    level: number;
    currentExperience:number;
    challengesCompleted:number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    experienceToNextLevel: number
    completeChallenge: () => void;
    closeModal: () => void;
}

interface ChallengesProviderProps{
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export const challengesContext = createContext({} as ChallengesContextData)

export default function ChallengesProvider({children, ...rest}: ChallengesProviderProps){
    const [level, setLevel] = useState(rest.level ?? 1)
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
    const [challengesCompleted, setChallengeCompleted] = useState(rest.challengesCompleted ?? 0)

    const [isLevelUpModal, setIsLevelUpModal] = useState(false)

    const[activeChallenge, setActiveChallenge] = useState(null)

    const experienceToNextLevel = Math.pow((level + 1)* 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookie.set('level', String(level))
        Cookie.set('currentExperience', String(currentExperience)) 
        Cookie.set('challengesCompleted', String(challengesCompleted))
    }, [level, currentExperience, challengesCompleted])

    function levelUp(){
        setLevel(level + 1)
        setIsLevelUpModal(true)
      
    }

    function closeModal(){
        setIsLevelUpModal(false)
    }

    function startNewChallenge(){
       const randomChallenges = Math.floor(Math.random() * challenges.length)
       const challenge = challenges[randomChallenges]
       setActiveChallenge(challenge)
       new Audio('/notification.mp3') 

       if(Notification.permission === 'granted'){
           new Notification('Novo Desafio', {
               body: `Valendo ${challenge.amount}xp!`
           })
       }
    }

    function resetChallenge(){
        setActiveChallenge(null)
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount

        if(finalExperience >= experienceToNextLevel){
            finalExperience - experienceToNextLevel
           levelUp()
        }
        setChallengeCompleted(challengesCompleted + 1)
        setActiveChallenge(null)
        setCurrentExperience(finalExperience)
        setActiveChallenge(null)
    }

    return(
        <challengesContext.Provider 
        value={{ level, levelUp, currentExperience, challengesCompleted,
        startNewChallenge, activeChallenge, resetChallenge, experienceToNextLevel, completeChallenge, closeModal
        
        }}>
            {children}
            { isLevelUpModal ? (<LevelUpModal/>)  : (null)}
        </challengesContext.Provider>
    )
    
}