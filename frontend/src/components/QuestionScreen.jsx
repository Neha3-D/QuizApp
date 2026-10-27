/*
  FILE: src/components/QuestionScreen.jsx
  WHAT THIS FILE CARRIES:
  - Question screen layout: logo, progress bar, question card with number,
    question text, 4 option buttons and a Next button.
  - STATIC VERSION: uses one hardcoded sample question. Clicking an option does
    nothing (no answer validation). Next button just opens the Result screen.
*/

// screen => current question, question no, total questions, and the function from contextapi
// displays => question, options, progress bar
// when the user selects an option, the selected option is saved in state and API checks answer is crt or not
// based on the API response, context api updates the question status
// selected option => green color: crt , red: not crt, other options 
// became disabled
// when question hanges useEffect() resets the selected option for the new question
// Next button remains disabled untill the question is attempted, clicking it moves to the next question
// last question => submit btn and open the resultScreen

// Display questions => select options => validate answer through API => show crt/wrong status => submit => result screen


import React, { useCallback, useEffect, useState } from 'react'
import Card from "./ui/Card"
import Button from "./ui/Button"
import ProgressBar from "./ui/ProgressBar"
import QuizLogo from "./ui/QuizLogo"
import NextArrow from "../assets/chevron-left-rounded.svg"
import CorrectCheckmark from "../assets/white-checkmark.svg"
import IncorrectCheckmark from "../assets/incorrect-cross.svg"

import useQuestionContext from "../hooks/useQuestionContext"
import validateAnswerApi from "../api/validateAnswerApi"
import handleError from "../utils/handleError"
import clsx from "clsx"

// hardcoded sample data (in dynamic version this comes from the backend)
// const sampleQuestion = {
//   question: 'Which planet is known as the "Red Planet"?',
//   options: [
//     { id: 1, value: "Earth" },
//     { id: 2, value: "Mars" },
//     { id: 3, value: "Venus" },
//     { id: 4, value: "Jupiter" }
//   ]
// }

function NextArrowIcon() {
  return <img src={NextArrow} alt='Next Question' />
}

const QuestionScreen = ({ showResultScreen }) => {

  const [loading, setLoading] = useState(false);

  const {activeNextQuestion, 
         activeQuestion, 
         activeQuestionNumber, 
         totalQuestions, 
         updateQuestionStatus
        } = useQuestionContext()
  
  // track selected option

  const [userSelectedOption, setUserSelectedOption] = useState("")
  const hasAttempted = Boolean(userSelectedOption)

  // reset selected option when question changes
  useEffect(() =>{
    setUserSelectedOption("");
  }, [activeQuestion._id])

  const isFinalQuestion = activeQuestionNumber === totalQuestions

  const handleResponse = useCallback(
    function(responseData){
      const isAnswerCorrect = responseData.status === 1;
      updateQuestionStatus(isAnswerCorrect)
    },
    [updateQuestionStatus]
  )

  // when user click an option
  const handleClick = useCallback((selectedOption) => {
    setUserSelectedOption(selectedOption.id)
    validateAnswerApi(activeQuestion._id, selectedOption, handleResponse, handleError, setLoading)
  },
  [activeQuestion._id, handleResponse])


  return (
    <section className='question-section'>
      <QuizLogo />
      <ProgressBar />
      <div className='question-content'>
        <Card className="question-card">
          <div className='question-number'>{activeQuestionNumber}/{totalQuestions}</div>

          <p className='question-text'>{activeQuestion.question}</p>

          {/* instead of writing code for each option we have used map method to loop all options at once */}

          <div className='question-options'>
            {activeQuestion.options.map((option) => {
            
            const isThisSelected = option.id === userSelectedOption
            const isOptionCorrect = isThisSelected && activeQuestion.isAnswerCorrect
            const isOptionIncorrect = isThisSelected && !loading && !activeQuestion.isAnswerCorrect
            const isLoading = isThisSelected && loading
            
            return (
              <button 

              className= {clsx
                ("option",
                  !hasAttempted && "not-answered",
                  isLoading && "loading",
                  isOptionCorrect && "correct-answer",
                  isOptionIncorrect && "incorrect-answer"
                )
              }

              key={activeQuestion._id + "-" + option.id}
              onClick={() => handleClick(option)}
              disabled = {hasAttempted}
              >
                {option.value}

                {isThisSelected ? (
                  <span className={ clsx(isOptionCorrect && "correct-radio",
                    isOptionIncorrect && "incorrect-radio"
                  )}>

                    {isOptionCorrect && <img src={CorrectCheckmark} alt="correct checkmark"/>}
                    {isOptionIncorrect && <img src={IncorrectCheckmark} alt="incorrect checkmark"/>}

                  </span>
                ):(
                <span className='unattempted-radio' />
                )}

              </button>
            )})}
          </div>

          {isFinalQuestion ?(
            <Button disabled={!activeQuestion.hasAttempted} onClick={showResultScreen}>
            Submit
            </Button>
          ):(
            <Button icon={<NextArrowIcon />} iconPosition="right" 
            disabled={!activeQuestion.hasAttempted}
            onClick={activeNextQuestion}>
            Next
          </Button>
          )
          }
        </Card>
      </div>
    </section>
  )
}

export default QuestionScreen

