import { Router } from "express";

import { verifyToken } from "../../controllers/users/users.controller.mjs";
import {
    generateExamByLevel
} from "../../controllers/exams/exams.controller.mjs";

export const exams = Router();

exams.post("/generate", verifyToken, generateExamByLevel);