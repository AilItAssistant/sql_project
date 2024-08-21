import { Router } from "express";

import {
    getStatements,
    getStatementsById,
    postStatements,
    getStatementsAndDetails
} from "../../controllers/statements/statements.controller.mjs";

export const statements = Router();

//?GET ALL STATEMENTS
statements.get("/", getStatements);

//?POST STATEMENTS
statements.get("/details", getStatementsAndDetails);

//?GET STATEMENTS BY ID
statements.get("/:statementId", getStatementsById);

//?POST STATEMENTS
statements.post("/", postStatements);