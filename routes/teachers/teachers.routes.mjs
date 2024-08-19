import { Router } from "express";

import {
    getTeachers,
    
} from "../../controllers/teachers/teachers.controller.mjs";

export const teachers = Router();

//?GET ALL TEACHERS

teachers.get("/", getTeachers);