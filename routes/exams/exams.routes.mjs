import { Router } from "express";

import {
    getExams,
    postQuestions
    
} from "../../controllers/exams/exams.controller.mjs";

export const exams = Router();

//?GET ALL EXAMS

exams.get("/", getExams);

//? ADD QUESTIONS

exams.post("/", postQuestions);