import { Router } from "express";

import { verifyToken } from "../../controllers/users/users.controller.mjs";
import {
    beforeCRUD,
    afterCRUD,
    add,
    filter,
    getInfo
} from "../../controllers/user_actions/user_actions.controller.mjs";

import {
    getSkills,
    editSkill,
    statusSkill,
    addSkill,
    deleteSkill,
    searchSkill,
    getActiveSkills,
    skillsId,
    getSkillsByLevels,
    addLeveltoSkill,
    deleteLeveltoSkill
} from "../../controllers/skill/skill.controller.mjs";

export const skills = Router();

//?GET ALL SKILLS
skills.get("/", verifyToken, getSkills);

//?GET ACIVE SKILLS
skills.get("/active", verifyToken, getActiveSkills);

//?EDIT SKILL
skills.put("/edit", verifyToken, beforeCRUD, editSkill, afterCRUD);

//?SKILL CHANGE STATUS
skills.put("/status", verifyToken, beforeCRUD, statusSkill, afterCRUD);

//?SKILL ADD
skills.post("/add", verifyToken, add, addSkill);

//?DELETE SKILL
skills.put("/delete", verifyToken, beforeCRUD, deleteSkill);

//?SEARCH SKILL
skills.put("/search", verifyToken, filter,  searchSkill);

//?GET SKILLS BY ID
skills.post("/skillsId", verifyToken, getInfo, skillsId);

//?GET SKILL BY LEVEL ID
skills.post("/skillsLevel", verifyToken, getInfo, getSkillsByLevels);

//?ADD LEVEL TO SKILL
skills.post("/addLeveltoSkill", verifyToken, getInfo, addLeveltoSkill);

//?DELETE LEVEL TO SKILL
skills.put("/deleteLeveltoSkill", verifyToken, getInfo, deleteLeveltoSkill);