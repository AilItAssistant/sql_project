import { Router } from "express";

import {
    addQuestion,
} from "../../controllers/questions/questions.controller.mjs";

export const questions = Router();

//?PUSH BLOCKS

questions.post("/", addQuestion);

