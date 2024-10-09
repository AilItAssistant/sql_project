import { Router } from "express";

import { verifyToken } from "../../controllers/users/users.controller.mjs";
import {
    getSkills,
    editSkill,
    statusSkill,
    addSkill,
    deleteSkill,
    searchSkill,
    getActiveSkills,
    skillsId
} from "../../controllers/skill/skill.controller.mjs";

export const skills = Router();

//?GET ALL SKILLS
skills.get("/", verifyToken, getSkills);

//?GET ACIVE SKILLS
skills.get("/active", verifyToken, getActiveSkills);

//?EDIT SKILL
skills.put("/edit", verifyToken, editSkill);

//?SKILL CHANGE STATUS
skills.put("/status", verifyToken, statusSkill);

//?SKILL ADD
skills.post("/add", verifyToken, addSkill);

//?DELETE SKILL
skills.put("/delete", verifyToken, deleteSkill);

//?SEARCH SKILL
skills.put("/search", verifyToken, searchSkill);

//?GET SKILLS BY ID
skills.post("/skillsId", verifyToken, skillsId)