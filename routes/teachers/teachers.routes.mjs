import { Router } from "express";

import {
    getTeachers,
    filterTeachers
} from "../../controllers/teachers/teachers.controller.mjs";

export const teachers = Router();

//?GET ALL TEACHERS
teachers.get("/", getTeachers);

//?GET ALL TEACHERS WITH FILTERS
teachers.put("/filter", filterTeachers);