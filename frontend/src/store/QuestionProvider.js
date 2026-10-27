// Makes the data available to components

// brain of our quiz application
// 1. Get the questions from the backend
// 2. Display one question at a time
// 3. Know which question currently displayed
// 4. Check whether the students answer is correct or wrong
// 5. Move to the next question
// 6. Count how many answers are correct
// 7. Share this information with the components that need it

import { useState, useMemo, useCallback } from "react";
import QuestionContext from "./QuestionContext";

const QuestionProvider = ({children}) =>{

    const [questions, setQuestions] = useState([])
    const [activeQuestionId, setActiveQuestionId] = useState(" ")

    // find the active question
    const activeQuestion = useMemo(
        () => questions.find((question) => question._id === activeQuestionId),
        [activeQuestionId, questions]
    )

    // we know from above which question is active, 
    // NOW we need to find its position in array and convert that position into question number 
    // to show the progress like eg:5/30

    // if array index       displayed question to the user
    //   0                             1
    //   1                             2

    const activeQuestionNumber = useMemo(
        () => questions.findIndex((question) => question._id === activeQuestionId) + 1,
        [activeQuestionId, questions]
    )

    const totalQuestions = questions.length

    // mark active question as attempted and save if answer was correct
    // suppose activeQuestion is 2 and that answer selected by user is wrong
    // Question 2 gets hasAttempted: true
    // Question 2 gets isAnswerCorrect: false
    // Other question remain unchanged

    const updateQuestionStatus = useCallback(
        (isAnswerCorrect) => {
            setQuestions
            ((prevQuestions) => 
                prevQuestions.map((question) =>
                    question._id === activeQuestionId ? {...question, hasAttempted:true, isAnswerCorrect} :
            question )
        )
    },
    [activeQuestionId]
    )

    // move to the next question
    const activeNextQuestion = useCallback(()=>{

        const currentIndex = questions.findIndex((question)=> question._id === activeQuestionId)

        // -1 => not found
        if(currentIndex !== -1 && currentIndex + 1 < questions.length){
            setActiveQuestionId(questions[currentIndex + 1]._id)
        }

    },[activeQuestionId,questions])

    // count correct answer
    const correctAnswers = useMemo(
        () => questions.filter((question) => question.isAnswerCorrect).length,
        [questions]
    )

    // process the questions received from the API
    // 1. save the question and initialize their answer status
    // 2. select the frst question so that the quiz can begin

    const processQuestions = useCallback((questionApiResponse) => {
        setQuestions(
            questionApiResponse.map((question) => ({
                ...question,
                hasAttempted:false,
                isAnswerCorrect:false
            }))
        );
        setActiveQuestionId(questionApiResponse[0]._id)
    },[])

    // prepare data to share with components

    const contextValue = useMemo(
        () => ({
            processQuestions,
            activeNextQuestion,
            activeQuestion,
            activeQuestionNumber,
            totalQuestions,
            correctAnswers,
            updateQuestionStatus
        }),
        [
            processQuestions,
            activeNextQuestion,
            activeQuestion,
            activeQuestionNumber,
            totalQuestions,
            correctAnswers,
            updateQuestionStatus
        ]
    )

    return (
        <QuestionContext.Provider value={contextValue}>
            {children}
        </QuestionContext.Provider>
    )

}

export default QuestionProvider

