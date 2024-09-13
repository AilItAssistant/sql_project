import { Router } from "express";

import {
    addQuestion,
    getQuestionById
} from "../../controllers/questions/questions.controller.mjs";

export const questions = Router();

//?PUSH QUESTION
questions.post("/add", addQuestion);

//?GET QUESTION BY ID
questions.put("/getById", getQuestionById);