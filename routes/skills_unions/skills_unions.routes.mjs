import { Router } from "express";

import { verifyToken } from "../../controllers/users/users.controller.mjs";
import {
    beforeCRUD,
    afterCRUD,
    getInfo
} from "../../controllers/user_actions/user_actions.controller.mjs";

import {
    getSkillsUnions,
    deleteSkillsUnions,
    desactivateSkillsUnions,
    editSkillsUnions,
    addSkillsUnions,
    addSkilltoUnion,
    deleteSkilltoUnion,
    addLeveltoUnion,
    deleteLeveltoUnion
} from "../../controllers/skills_unions/skills_unions.controller.mjs";

export const skills_unions = Router();

//?GET ALL SKILLS UNION
skills_unions.get("/", verifyToken, getSkillsUnions);

//?DELETE SKILL_UNION
skills_unions.put("/delete", verifyToken, beforeCRUD, deleteSkillsUnions);

//?DESACTIVATE SKILL_UNION
skills_unions.put("/status", verifyToken, beforeCRUD, desactivateSkillsUnions, afterCRUD);

//?EDIT SKILL_UNION
skills_unions.put("/edit", verifyToken, beforeCRUD, editSkillsUnions, afterCRUD);

//?ADD SKILL_UNION
skills_unions.post("/add", verifyToken, getInfo, addSkillsUnions);

//?ADD SKILL TO UNION
skills_unions.post("/addSkilltoUnion", verifyToken, getInfo, addSkilltoUnion);

//?DELETE SKILL TO UNION
skills_unions.put("/deleteSkilltoUnion", verifyToken, getInfo, deleteSkilltoUnion);

//?ADD LEVEL TO UNION
skills_unions.post("/addLeveltoUnion", verifyToken, getInfo, addLeveltoUnion);

//?DELETE LEVEL TO UNION
skills_unions.put("/deleteLeveltoUnion", verifyToken, getInfo, deleteLeveltoUnion);