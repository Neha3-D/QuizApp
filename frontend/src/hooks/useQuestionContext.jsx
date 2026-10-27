// reusable way to read the context value

import { useContext } from "react";
import QuestionContext from "../store/QuestionContext";

function useQuestionContext(){
    return useContext(QuestionContext);
}

export default useQuestionContext;

