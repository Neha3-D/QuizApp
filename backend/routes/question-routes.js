const express = require("express");
const router = express.Router();

const {getQuestions, validateAnswer} = require("../controllers/question-controller");

// GET questions
router.get("/", getQuestions)
router.post("/validate-answer", validateAnswer)

module.exports = router;