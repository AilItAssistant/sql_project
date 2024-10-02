import { Router } from "express";

import { verifyToken } from "../../controllers/users/users.controller.mjs";
import {
    getAnswerById
} from "../../controllers/answers/answers.controller.mjs";

export const answers = Router();

//?GET ANSWERS BY ID
answers.put("/getById", verifyToken, getAnswerById);