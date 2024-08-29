import { Router } from "express";

import {
    getSkills,
    editSkill,
    statusSkill
} from "../../controllers/skill/skill.controller.mjs";

export const skills = Router();

//?GET ALL SKILLS
skills.get("/", getSkills);

//?EDIT SKILL
skills.put("/edit", editSkill);

//?SKILL CHANGE STATUS
skills.put("/status", statusSkill);