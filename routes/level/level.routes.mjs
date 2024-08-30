import { Router } from "express";

import {
    getLevels,
    editLevel,
    statusLevel,
    addLevel,
    deleteLevel,
    searchLevel
} from "../../controllers/level/level.controller.mjs";

export const levels = Router();

//?GET ALL LEVELS

levels.get("/", getLevels);

//?EDIT LEVEL
levels.put("/edit", editLevel);

//?LEVEL CHANGE STATUS
levels.put("/status", statusLevel);

//?LEVEL ADD
levels.post("/add", addLevel);

//?DELETE LEVEL
levels.put("/delete", deleteLevel);

//?SEARCH LEVELS
levels.put("/search", searchLevel)