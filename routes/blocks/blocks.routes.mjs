import { Router } from "express";

import {
    getBlocks,
} from "../../controllers/blocks/blocks.controller.mjs";

export const blocks = Router();

//?GET ALL BLOCKS

blocks.get("/", getBlocks);