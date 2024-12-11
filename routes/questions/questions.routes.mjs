import { Router } from "express";

import { verifyToken } from "../../controllers/users/users.controller.mjs";
import {
    beforeCRUD,
    afterCRUD,
    add,
    getInfo
} from "../../controllers/user_actions/user_actions.controller.mjs";

import {
    addQuestion,
    getQuestionById,
    getQuestionsAnswers,
    editQuestions,
    statusQuestionById,
    deleteQuestionById,
    getQuestionsAnswersByBlockId,
    deleteImage
} from "../../controllers/questions/questions.controller.mjs";

export const questions = Router();

//?PUSH QUESTION
questions.post("/add", verifyToken, add, addQuestion);

//?GET QUESTION BY ID
questions.put("/getById", verifyToken, getInfo, getQuestionById);

//?GET QUESTIONS AND ANSWERS
questions.post("/getQuestionsAnswers", verifyToken, getInfo, getQuestionsAnswers);

//?EDIT QUESTIONS
questions.put("/edit", verifyToken, beforeCRUD, editQuestions, afterCRUD);

//?INACTIVATE QUESTION
questions.put("/status", verifyToken, beforeCRUD, statusQuestionById, afterCRUD);

//?DELETE QUESTION
questions.put("/delete", verifyToken, beforeCRUD, deleteQuestionById);

//?GET QUESTIONS AND ANSWERS BY BLOCK ID
questions.post("/getQuestionsAnswersByBlockId", verifyToken, getInfo, getQuestionsAnswersByBlockId);

//?DELETE PHOTO TO QUESTIONS AND PHOTO TABLE
questions.put("/deleteImage", verifyToken, getInfo, deleteImage);