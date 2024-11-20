import { Router } from "express";

import { verifyToken } from "../../controllers/users/users.controller.mjs";
import {
    getPermissions
} from "../../controllers/permissions/permissions.controller.mjs";

export const permissions = Router();

//?GET ALL PERMISSIONS
permissions.get("/", verifyToken, getPermissions);