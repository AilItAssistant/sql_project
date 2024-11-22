import { Router } from "express";

import { verifyToken } from "../../controllers/users/users.controller.mjs"
import {
    getDepartments
} from "../../controllers/departments/departments.controller.mjs";

export const departments = Router();

//?GET ALL DEPARTMENTS
departments.get("/", verifyToken, getDepartments);