import { Router } from "express";

import {
    getBlocks,
    editBlock,
    statusBlock
} from "../../controllers/blocks/blocks.controller.mjs";

export const blocks = Router();

//?GET ALL BLOCKS
blocks.get("/", getBlocks);

//?EDIT BLOCKS
blocks.put("/edit", editBlock);

//?BLOCKS CHANGE STATUS
blocks.put("/status", statusBlock);