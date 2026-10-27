/*
  FILE: src/components/ui/ProgressBar.jsx
  WHAT THIS FILE CARRIES:
  - Shows quiz progress using the built-in HTML <progress> element.
  - STATIC VERSION: uses hardcoded values (question 1 of 30).
    In the dynamic version these values come from QuestionContext.
*/
import React, {useMemo} from 'react'
import clsx from "clsx"
import useQuestionContext from "../../hooks/useQuestionContext";

const ProgressBar = () => {
  // static values
  // const activeQuestionNumber = 1;
  // const totalQuestions = 30;

  const {activeQuestionNumber, totalQuestions} = useQuestionContext()
  const progressText = useMemo(
    () => `${((activeQuestionNumber / totalQuestions) * 100).toFixed(2)}%`,
    [activeQuestionNumber, totalQuestions]
  )
  const isFinalQuestion = activeQuestionNumber === totalQuestions;

  return (
    <progress
      value={activeQuestionNumber}
      max={totalQuestions}
      className={clsx("progress-bar", isFinalQuestion && "final-question")}
    >
      {progressText}
    </progress>
  )
}

export default ProgressBar

