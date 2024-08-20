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

//? GET UNVALIDATED ALL EXAMS

exams.get("/unvalidated", getUnvalidated);

//? GET EXAM BY STUDENT ID

exams.get("/onlineExam", getOnlineExam);
