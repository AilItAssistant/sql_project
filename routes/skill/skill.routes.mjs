import { Router } from "express";

import {
    getSkills,
    
} from "../../controllers/skill/skill.controller.mjs";

export const skills = Router();

//?GET ALL SKILLS

skills.get("/", getSkills);