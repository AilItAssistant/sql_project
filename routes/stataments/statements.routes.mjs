import { Router } from "express";

import  { verifyToken } from "../../controllers/users/users.controller.mjs";
import {
    beforeCRUD,
    afterCRUD,
    add,
    getInfo
} from "../../controllers/user_actions/user_actions.controller.mjs";

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
    getAllByStructureIds,
    getStatementByStatementId
} from "../../controllers/statements/statements.controller.mjs";

export const statements = Router();

//?GET ALL STATEMENTS
statements.get("/", verifyToken, getStatements);

//?GET STATEMENTS BY LEVEL_ID AND SKILL_ID
statements.post("/levelSkill", verifyToken, getInfo, levelSkillStatements);

//?GET STATEMENTS BY LEVEL_ID, BLOCK_ID AND SKILL_ID
statements.post("/levelSkillBlock", verifyToken, getInfo, levelSkillBlockStatements);

//?GET STATEMENTS AND DETAILS
statements.get("/details", verifyToken, getStatementsAndDetails);

//?GET STATEMENTS BY ID
statements.get("/:statementId", verifyToken, getStatementsById);

//?POST STATEMENTS
statements.post("/add", verifyToken, add, postStatements);

//?EDIT STATEMENTS
statements.put("/edit", verifyToken, beforeCRUD, editStatements, afterCRUD);

//?INACTIVATE STATEMENT
statements.put("/status", verifyToken, beforeCRUD, statusStatementById, afterCRUD);

//?DELETE STATEMENT
statements.put("/delete", verifyToken, beforeCRUD, deleteStatementById);

//?DELETE PHOTO TO STATEMENTS AND PHOTO TABLE
statements.put("/deleteImage", verifyToken, getInfo, deleteImage);

//?GET STATEMENTS, QUESTIONS AND ANSWERS WITH ALL DATA BY LEVEL, SKILL AND BLOCK ID
statements.post("/getAllByStructureIds", verifyToken, getInfo, getAllByStructureIds);

//?GET STATEMENTS, QUESTIONS AND ANSWERS WITH ALL DATA BY STATEMENT ID
statements.post("/getStatementByStatementId", verifyToken, getInfo, getStatementByStatementId);