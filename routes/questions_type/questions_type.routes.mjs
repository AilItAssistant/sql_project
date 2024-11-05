import { Router } from "express";

import { verifyToken } from "../../controllers/users/users.controller.mjs";
import {
    getQuestionTypes,
} from "../../controllers/questions_type/questions_type.controller.mjs";

export const types = Router();

//?GET ALL TYPES
types.get("/", verifyToken, getQuestionTypes);