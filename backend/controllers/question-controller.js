// controller :logic

// 2 controllers/functions
// get all questions:

// get questions from mongodb
// pick maximum 30 random questions
// send only the question and options to the frontend
// if something goes wrong send error


// validate answer:
// work with ans is correct or not

const QuestionModel = require("../models/question-model")

const MAX_QUUESTION_COUNT = 30;

// get all questions

const getQuestions = async (req,res) =>{
    try{
        // get question from Mongodb

        const questions = await QuestionModel.aggregate([
            {$sample: {size :  MAX_QUUESTION_COUNT }},
            {$project: {question:1, options:1}}
        ])

        res.status(200).json({questions})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

// validate answer
// selected answer is correct or not


// when the user clicks my option :
// a. in database are u goin to check option selected by user
// b.first find that question an dif found in that option will check

// {
// id: "question id"
// answer: {
//         id:"",
//         value:""
//       }
// }

// req.body => id,answer
// 1.extract data
// 2.check if req is valid

const validateAnswer = async (req, res) =>{
    try{
        // Extract the data from req
        const {id,answer} = req.body;

        // validate the req
        if(!id || !answer.id || !answer.value){
            return res.status(400).json({message:"Invalid req"})
        }

        // check if question exists
        const questionObj = await QuestionModel.findById(id);

        if(!questionObj){
            return res.status(400).json({message:"question does not exist"})
        }

        // validate the answer
        // answer selected by user and answer present in db
        // db answer id === student answer id
        if(questionObj.answer.id === answer.id &&
            questionObj.answer.value === answer.value
        ){
            return res.status(200).json({status:1, message:"Correct ans"})
        }

        // wrong answer
        // wrong ans is not a server error. the API successfully receives the ans and successfully checked it
        // so the ans is simply wrong
        return res.status(200).json({status:0, message:"Wrong ans"})

    }catch(err){
        console.error("Error validating answer:", err );
        res.status(500).json({success:false, message: err.message})
    }
}

module.exports ={getQuestions, validateAnswer};