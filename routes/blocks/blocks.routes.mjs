import { Router } from "express";

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
blocks.get("/", getBlocks);

//?EDIT BLOCKS
blocks.put("/edit", editBlock);

//?BLOCKS CHANGE STATUS
blocks.put("/status", statusBlock);

//?ADD BLOCKS 
blocks.post("/add", addBlock);

//?DELETE BLOCKS
blocks.put("/delete", deleteBlock);

//?SEARCH BLOCKS
blocks.put("/search", searchBlock)