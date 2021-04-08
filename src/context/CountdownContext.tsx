import { Children, createContext, ReactNode, useContext, useEffect, useState } from "react";
import { challengesContext } from "./ChallengeContext";

interface countdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    resetCountdown: () => void;
    startCountdown: () => void;
}

interface CountDownProviderProps{
    children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout

export const CountdownContext = createContext({} as countdownContextData)

export function CountdownProvider({children}: CountDownProviderProps){
    const { startNewChallenge } = useContext(challengesContext)

    const [time, setTime] = useState(25 * 60)
    const [isActive, setIsActive] = useState(false)
    const[hasFinished, setHasFinished] = useState(false)


    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown(){
        setIsActive(true)
    }

    function resetCountdown(){
        clearTimeout(countdownTimeout)
        setIsActive(false)
        setTime(25 * 60)
        setHasFinished(false)
        
    }
   

    useEffect(() => {
        if(isActive && time > 0 ){
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        }else if (isActive && time == 0 ){
            setHasFinished(true);
            setIsActive(false)
            startNewChallenge()
            
           
        }
       
        
        
    }, [isActive, time])

    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            resetCountdown,
            startCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    )
}