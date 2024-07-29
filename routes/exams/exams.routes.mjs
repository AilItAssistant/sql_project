import { Router } from "express";

import {
    getExams,
    postQuestions,
    deleteQuestions,
    editQuestions
    
} from "../../controllers/exams/exams.controller.mjs";

export const exams = Router();

//?GET ALL EXAMS

exams.get("/", getExams);

//? ADD QUESTIONS

exams.post("/", postQuestions);

//? DELETE QUESTIONS

exams.put("/", deleteQuestions);

//? EDIT QUESTIONS

exams.put("/edit", editQuestions)