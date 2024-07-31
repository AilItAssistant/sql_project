import { Router } from "express";

import {
    getExams,
    postQuestions,
    deleteQuestions,
    editQuestions,
    deleteUnvalidated,
    editUnvalidated,
    validatedQuestion,
    getUnvalidated,
    getOnlineExam
    
} from "../../controllers/exams/exams.controller.mjs";

export const exams = Router();

//? GET ALL EXAMS

exams.get("/", getExams);

//? ADD QUESTIONS

exams.post("/", postQuestions);

//? DELETE QUESTIONS

exams.put("/", deleteQuestions);

//? EDIT QUESTIONS

exams.put("/edit", editQuestions);

//? DELETE UNVALIDATED QUESTION

exams.put("/delete", deleteUnvalidated);

//? EDIT UNVALIDATED QUESTIONS

exams.put("/editUnvalidated", editUnvalidated);

//? VALIDATED QUESTIONS

exams.put("/validate", validatedQuestion);

//? GET UNVALIDATED ALL EXAMS

exams.get("/unvalidated", getUnvalidated);

//? GET EXAM BY STUDENT ID

exams.get("/onlineExam", getOnlineExam);
