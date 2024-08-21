import { Router } from "express";

import {
    getStatements,
    getStatementsById,
    postStatements
} from "../../controllers/statements/statements.controller.mjs";

export const statements = Router();

//?GET ALL STATEMENTS
statements.get("/", getStatements);

//?GET STATEMENTS BY ID
statements.get("/:statementId", getStatementsById);

//?POST STATEMENTS
statements.post("/", postStatements);