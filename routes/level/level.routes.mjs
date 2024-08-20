import { Router } from "express";

import {
    getLevels,
    
} from "../../controllers/level/level.controller.mjs";

export const levels = Router();

//?GET ALL LEVELS

levels.get("/", getLevels);