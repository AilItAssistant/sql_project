import { Router } from "express";

import { verifyToken } from "../../controllers/users/users.controller.mjs";
import {
    getAnswerById,
    editAnswers,
    statusAnswerById,
    deleteAnswerById
} from "../../controllers/answers/answers.controller.mjs";

export const answers = Router();

//?GET ANSWERS BY ID
answers.put("/getById", verifyToken, getAnswerById);

//?EDIT ANSWERS
answers.put("/edit", verifyToken, editAnswers);

//?INACTIVATE ANSWER
answers.put("/status", verifyToken, statusAnswerById);

//?DELETE ANSWER
answers.put("/delete", verifyToken, deleteAnswerById);