import { Router } from "express";

import { verifyToken } from "../../controllers/users/users.controller.mjs";
import {
    getBlocks,
    editBlock,
    statusBlock,
    addBlock,
    deleteBlock,
    searchBlock
} from "../../controllers/blocks/blocks.controller.mjs";

export const blocks = Router();

//?GET ALL BLOCKS
blocks.get("/", verifyToken, getBlocks);

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