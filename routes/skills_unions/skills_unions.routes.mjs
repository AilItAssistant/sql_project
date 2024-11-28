import { Router } from "express";

import { verifyToken } from "../../controllers/users/users.controller.mjs";
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
skills_unions.put("/delete", verifyToken, deleteSkillsUnions);

//?DESACTIVATE SKILL_UNION
skills_unions.put("/status", verifyToken, desactivateSkillsUnions);

//?EDIT SKILL_UNION
skills_unions.put("/edit", verifyToken, editSkillsUnions);

//?ADD SKILL_UNION
skills_unions.post("/add", verifyToken, addSkillsUnions);

//?ADD SKILL TO UNION
skills_unions.post("/addSkilltoUnion", verifyToken, addSkilltoUnion);

//?DELETE SKILL TO UNION
skills_unions.put("/deleteSkilltoUnion", verifyToken, deleteSkilltoUnion);

//?ADD LEVEL TO UNION
skills_unions.post("/addLeveltoUnion", verifyToken, addLeveltoUnion);

//?DELETE LEVEL TO UNION
skills_unions.put("/deleteLeveltoUnion", verifyToken, deleteLeveltoUnion);