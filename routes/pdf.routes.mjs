import { Router } from "express";

import {
    getExamPdf,
    
} from "../controllers/pdf.controller.mjs";

export const exam = Router();

//?GET examPdf

exam.get("/", getExamPdf);