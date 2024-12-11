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
    getBlocks,
    editBlock,
    statusBlock,
    addBlock,
    deleteBlock,
    searchBlock,
    getActiveBlocks,
    blocksById,
    selectedChange,
    addSkilltoBlock,
    deleteSkilltoBlock,
    addLeveltoBlock,
    deleteLeveltoBlock,
    getBlocksByLevelSkill
} from "../../controllers/blocks/blocks.controller.mjs";

export const blocks = Router();

//?GET ALL BLOCKS
blocks.get("/", verifyToken, getBlocks);

//?GET ACTIVE BLOCKS
blocks.get("/active", verifyToken, getActiveBlocks);

//?EDIT BLOCKS
blocks.put("/edit", verifyToken, beforeCRUD, editBlock, afterCRUD);

//?BLOCKS CHANGE STATUS
blocks.put("/status", verifyToken, beforeCRUD, statusBlock, afterCRUD);

//?ADD BLOCKS
blocks.post("/add", verifyToken, add, addBlock);

//?DELETE BLOCKS
blocks.put("/delete", verifyToken, beforeCRUD, deleteBlock);

//?SEARCH BLOCKS
blocks.put("/search", verifyToken, filter, searchBlock);

//?GET BLOCK BY ID
blocks.post("/blocksId", verifyToken, getInfo, blocksById);

//?BLOCKS CHANGE IS_SELECTED
blocks.put("/selected", verifyToken, beforeCRUD, selectedChange);

//?ADD SKILL TO BLOCK
blocks.post("/addSkilltoBlock", verifyToken, getInfo, addSkilltoBlock);

//?DELETE SKILL TO BLOCK
blocks.put("/deleteSkilltoBlock", verifyToken, getInfo, deleteSkilltoBlock);

//?ADD LEVEL TO BLOCK
blocks.post("/addLeveltoBlock", verifyToken, getInfo, addLeveltoBlock);

//?DELETE LEVEL TO BLOCK
blocks.put("/deleteLeveltoBlock", verifyToken, getInfo, deleteLeveltoBlock);

//?//?GET BLOCKS BY SKILL_ID AND LEVEL_ID
blocks.post("/getBlocksByLevelSkill", verifyToken, getInfo, getBlocksByLevelSkill);