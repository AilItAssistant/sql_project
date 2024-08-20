import { Router } from "express";

import {
    getStatements,
    postStatements
} from "../../controllers/statements/statements.controller.mjs";

export const statements = Router();

//?GET ALL STATEMENTS
statements.get("/", getStatements);

//?POST STATEMENTS
statements.post("/", postStatements);