import { Router } from "express";

import {
    getExamPdf,
    
} from "../controllers/examPdf.controller.mjs";

export const examPdf = Router();

//?GET examPdf

examPdf.get("/", getExamPdf);