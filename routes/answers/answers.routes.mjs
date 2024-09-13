import { Router } from "express";

import {
    getAnswerById
} from "../../controllers/answers/answers.controller.mjs";

export const answers = Router();

//?GET ANSWERS BY ID
answers.put("/getById", getAnswerById);