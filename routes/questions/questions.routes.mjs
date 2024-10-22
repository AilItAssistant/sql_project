import { Router } from "express";

import { verifyToken } from "../../controllers/users/users.controller.mjs";
import {
    addQuestion,
    getQuestionById,
    getQuestionsAnswers,
    editQuestions,
    statusQuestionById,
    deleteQuestionById
} from "../../controllers/questions/questions.controller.mjs";

export const questions = Router();

//?PUSH QUESTION
questions.post("/add", verifyToken, addQuestion);

//?GET QUESTION BY ID
questions.put("/getById", verifyToken, getQuestionById);

//?GET QUESTIONS AND ANSWERS
questions.post("/getQuestionsAnswers", verifyToken, getQuestionsAnswers);

//?EDIT QUESTIONS
questions.put("/edit", verifyToken, editQuestions);

//?INACTIVATE QUESTION
questions.put("/status", verifyToken, statusQuestionById);

//?DELETE QUESTION
questions.delete("/delete", verifyToken, deleteQuestionById);