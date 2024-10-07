import { Router } from "express";

import { verifyToken } from "../../controllers/users/users.controller.mjs";
import {
    getBlocks,
    editBlock,
    statusBlock,
    addBlock,
    deleteBlock,
    searchBlock,
    getActiveBlocks
} from "../../controllers/blocks/blocks.controller.mjs";

export const blocks = Router();

//?GET ALL BLOCKS
blocks.get("/", verifyToken, getBlocks);

//?GET ACTIVE BLOCKS
blocks.get("/active", verifyToken, getActiveBlocks);

//?EDIT BLOCKS
blocks.put("/edit", verifyToken, editBlock);

//?BLOCKS CHANGE STATUS
blocks.put("/status", verifyToken, statusBlock);

//?ADD BLOCKS 
blocks.post("/add", verifyToken, addBlock);

//?DELETE BLOCKS
blocks.put("/delete", verifyToken, deleteBlock);

//?SEARCH BLOCKS
blocks.put("/search", verifyToken, searchBlock)