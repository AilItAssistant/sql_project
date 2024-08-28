import { Router } from "express";

import {
    getLevels,
    editLevel
    
} from "../../controllers/level/level.controller.mjs";

export const levels = Router();

//?GET ALL LEVELS

levels.get("/", getLevels);

//?EDIT LEVEL
levels.put("/edit", editLevel);