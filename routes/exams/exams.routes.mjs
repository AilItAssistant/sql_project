import { Router } from "express";

import { verifyToken } from "../../controllers/users/users.controller.mjs";
import {
    exam
} from "../../controllers/user_actions/user_actions.controller.mjs";

import {
    generateExamByLevel
} from "../../controllers/exams/exams.controller.mjs";

export const exams = Router();

exams.post("/generate", verifyToken, exam, generateExamByLevel);