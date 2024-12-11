import { Router } from "express";
import { verifyToken } from "../../controllers/users/users.controller.mjs";

import { entryPage } from "../../controllers/user_actions/user_actions.controller.mjs";

export const user_actions = Router();

//?GET ENTRY PAGE INFO
user_actions.post("/entryPage", verifyToken, entryPage);