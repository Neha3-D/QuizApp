/*
  FILE: src/components/Main.jsx
  WHAT THIS FILE CARRIES:
  - Screen switcher: shows Welcome, Question or Result screen.
  - STATIC VERSION: only a simple useState to move between screens so every
    screen can be viewed.
*/

import React, { useState } from 'react'
import WelcomeScreen from './WelcomeScreen'
import QuestionScreen from './QuestionScreen'
import ResultScreen from './ResultScreen'
import QuestionProvider from '../store/QuestionProvider'

const Main = () => {
  const [viewScreen, setViewScreen] = useState("welcome")

  const showQuestionScreen = () => setViewScreen("question")
  const showResultScreen = () => setViewScreen("result")

  return (
    <QuestionProvider>
      <div>
        {viewScreen === "welcome" && <WelcomeScreen showQuestionScreen={showQuestionScreen} />}
        {viewScreen === "question" && <QuestionScreen showResultScreen={showResultScreen} />}
        {viewScreen === "result" && <ResultScreen showQuestionScreen={showQuestionScreen} />}
      </div>
    </QuestionProvider>
  )
}

export default Main

