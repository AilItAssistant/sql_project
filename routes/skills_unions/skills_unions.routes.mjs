import { Router } from "express";

import { verifyToken } from "../../controllers/users/users.controller.mjs";
import {
    getSkillsUnions,
    deleteSkillsUnions,
    desactivateSkillsUnions,
    editSkillsUnions,
    addSkillsUnions
} from "../../controllers/skills_unions/skills_unions.controller.mjs";

export const skills_unions = Router();

//?GET ALL SKILLS UNION
skills_unions.get("/", verifyToken, getSkillsUnions);

//?DELETE SKILL_UNION
skills_unions.put("/delete", verifyToken, deleteSkillsUnions);

//?DESACTIVATE SKILL_UNION
skills_unions.put("/desactivate", verifyToken, desactivateSkillsUnions);

//?EDIT SKILL_UNION
skills_unions.put("/edit", verifyToken, editSkillsUnions);

//?ADD SKILL_UNION
skills_unions.put("/add", verifyToken, addSkillsUnions);