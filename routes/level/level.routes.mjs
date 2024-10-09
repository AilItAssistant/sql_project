import { Router } from "express";

import { verifyToken } from "../../controllers/users/users.controller.mjs";
import {
    getLevels,
    editLevel,
    statusLevel,
    addLevel,
    deleteLevel,
    searchLevel,
    getActiveLevels
} from "../../controllers/level/level.controller.mjs";

export const levels = Router();

//?GET ALL LEVELS
levels.get("/", verifyToken, getLevels);

//?GET ALL LEVELS
levels.get("/active", verifyToken, getActiveLevels);

//?EDIT LEVEL
levels.put("/edit", verifyToken, editLevel);

//?LEVEL CHANGE STATUS
levels.put("/status", verifyToken, statusLevel);

//?LEVEL ADD
levels.post("/add", verifyToken, addLevel);

//?DELETE LEVEL
levels.put("/delete", verifyToken, deleteLevel);

//?SEARCH LEVELS
levels.put("/search", verifyToken, searchLevel);