import { Router } from "express";

import { verifyToken } from "../../controllers/users/users.controller.mjs";
import {
    getStatus
} from "../../controllers/status/status.controller.mjs";

export const status = Router();

//?GET ALL STATUS
status.get("/", verifyToken, getStatus);