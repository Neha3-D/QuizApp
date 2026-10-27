/*
  FILE: src/components/ui/QuizLogo.jsx
  WHAT THIS FILE CARRIES:
  - Shows the Quiz logo image.
  - <QuizLogo />              => small (width 168)
  - <QuizLogo size="large" /> => large (width 306)
  - Pure UI component (same in static and dynamic versions).
*/
import React from 'react'
import Logo from "../../assets/quiz-logo.svg"

const QuizLogo = ({ size = "small" }) => {
  const allSizes = {
    small: 168,
    large: 306
  }
  return <img src={Logo} alt="Quiz logo" width={allSizes[size]} />
}

export default QuizLogo

