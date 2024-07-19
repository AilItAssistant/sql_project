import { Router } from "express";

import {
    getExamsA1,
    
} from "../../controllers/exams/examsA1.controller.mjs";

export const examsA1 = Router();

//?GET ALL A1 EXAMS

examsA1.get("/", getExamsA1);