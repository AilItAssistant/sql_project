import { Router } from "express";

import  { verifyToken } from "../../controllers/users/users.controller.mjs";
import {
    getStatements,
    getStatementsById,
    postStatements,
    getStatementsAndDetails,
    levelSkillStatements,
    levelSkillBlockStatements,
    editStatements,
    statusStatementById,
    deleteStatementById,
    deleteImage,
    getAllByStructureIds
} from "../../controllers/statements/statements.controller.mjs";

export const statements = Router();

//?GET ALL STATEMENTS
statements.get("/", verifyToken, getStatements);

//?GET STATEMENTS BY LEVEL_ID AND SKILL_ID
statements.post("/levelSkill", verifyToken, levelSkillStatements);

//?GET STATEMENTS BY LEVEL_ID, BLOCK_ID AND SKILL_ID
statements.post("/levelSkillBlock", verifyToken, levelSkillBlockStatements);

//?GET STATEMENTS AND DETAILS
statements.get("/details", verifyToken, getStatementsAndDetails);

//?GET STATEMENTS BY ID
statements.get("/:statementId", verifyToken, getStatementsById);

//?POST STATEMENTS
statements.post("/add", verifyToken, postStatements);

//?EDIT STATEMENTS
statements.put("/edit", verifyToken, editStatements);

//?INACTIVATE STATEMENT
statements.put("/status", verifyToken, statusStatementById);

//?DELETE STATEMENT
statements.put("/delete", verifyToken, deleteStatementById);

//?DELETE PHOTO TO STATEMENTS AND PHOTO TABLE
statements.put("/deleteImage", verifyToken, deleteImage);

//?GET STATEMENTS, QUESTIONS AND ANSWERS WITH ALL DATA BY LEVEL, SKILL AND BLOCK ID
statements.post("/getAllByStructureIds", verifyToken, getAllByStructureIds);