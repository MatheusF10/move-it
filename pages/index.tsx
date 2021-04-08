import ExperienceBar from '../src/components/ExperienceBar'
import Profile from '../src/components/Profile'
import CompletedChallenges from '../src/components/CompletedChallenges'
import Countdown from '../src/components/Countdown'
import styles from '../src/styles/pages/Home.module.css'
import Head from 'next/head'
import ChallengeBox from '../src/components/ChallengeBox'
import { CountdownProvider } from '../src/context/CountdownContext'
import { GetServerSideProps } from 'next'
import ChallengesProvider from '../src/context/ChallengeContext'

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}


export default function Home(props: HomeProps){
  return (
    <ChallengesProvider level={props.level}
    currentExperience={props.currentExperience}
    challengesCompleted={props.challengesCompleted}>
      <div className={styles.container}>
      <Head>
        <title>Início | move.it</title>
      </Head>
      <ExperienceBar />
      <CountdownProvider>
      <section>
        <div>
          <Profile />
          <CompletedChallenges />
          <Countdown></Countdown>
        </div>
        <div>
          <ChallengeBox></ChallengeBox>
        </div>
      </section>
      
      </CountdownProvider>
    </div>
    </ChallengesProvider>

    
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies
  
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}