import { Router } from "express";

import  { verifyToken } from "../../controllers/users/users.controller.mjs";
import {
    getStatements,
    getStatementsById,
    postStatements,
    getStatementsAndDetails
} from "../../controllers/statements/statements.controller.mjs";

export const statements = Router();

//?GET ALL STATEMENTS
statements.get("/", verifyToken, getStatements);

//?GET STATEMENTS AND DETAILS
statements.get("/details", verifyToken, getStatementsAndDetails);

//?GET STATEMENTS BY ID
statements.get("/:statementId", verifyToken, getStatementsById);

//?POST STATEMENTS
statements.post("/", verifyToken, postStatements);