import { Router } from "express";

import { verifyToken } from "../../controllers/users/users.controller.mjs";
import {
    beforeCRUD,
    afterCRUD,
    add,
    filter
} from "../../controllers/user_actions/user_actions.controller.mjs";

import {
    getLevels,
    editLevel,
    statusLevel,
    addLevel,
    deleteLevel,
    searchLevel,
    getActiveLevels,
    getActiveLevelsSkillsBlocks
} from "../../controllers/level/level.controller.mjs";

export const levels = Router();

//?GET ALL LEVELS
levels.get("/", verifyToken, getLevels);

//?GET ALL ACTIVE LEVELS
levels.get("/active", verifyToken, getActiveLevels);

//?EDIT LEVEL
levels.put("/edit", verifyToken, beforeCRUD, editLevel, afterCRUD);

//?LEVEL CHANGE STATUS
levels.put("/status", verifyToken, beforeCRUD, statusLevel, afterCRUD);

//?LEVEL ADD
levels.post("/add", verifyToken, add, addLevel);

//?DELETE LEVEL
levels.put("/delete", verifyToken, beforeCRUD, deleteLevel);

//?SEARCH LEVELS
levels.put("/search", verifyToken, filter, searchLevel);

//?GET ACTIVE LEVELS, SKILLS AND BLOCKS
levels.get("/activeLevelsSkillsBlocks", verifyToken, getActiveLevelsSkillsBlocks);