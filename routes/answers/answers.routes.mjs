import { Router } from "express";

import { verifyToken } from "../../controllers/users/users.controller.mjs";
import {
    beforeCRUD,
    afterCRUD,
    getInfo
} from "../../controllers/user_actions/user_actions.controller.mjs";

import {
    getAnswerById,
    editAnswers,
    statusAnswerById,
    deleteAnswerById,
    deleteImage
} from "../../controllers/answers/answers.controller.mjs";

export const answers = Router();

//?GET ANSWERS BY ID
answers.put("/getById", verifyToken, getInfo, getAnswerById);

//?EDIT ANSWERS
answers.put("/edit", verifyToken, beforeCRUD, editAnswers, afterCRUD);

//?INACTIVATE ANSWER
answers.put("/status", verifyToken, beforeCRUD, statusAnswerById, afterCRUD);

//?DELETE ANSWER
answers.put("/delete", verifyToken, beforeCRUD, deleteAnswerById);

//?DELETE PHOTO TO ANSWERS AND PHOTO TABLE
answers.put("/deleteImage", verifyToken, getInfo, deleteImage);