import { Router } from "express";

import {
    getTeachers,
    filterTeachers,
    deleteTeacher,
    statusTeacher,
    addTeacher,
    editTeacher,
    addClass,
    deleteClass
} from "../../controllers/teachers/teachers.controller.mjs";

export const teachers = Router();

//?GET ALL TEACHERS
teachers.get("/", getTeachers);

//?GET ALL TEACHERS WITH FILTERS
teachers.put("/filter", filterTeachers);

//?DELETE TEACHER BY ID
teachers.put("/delete", deleteTeacher);

//?CHANGE STATUS
teachers.put("/status", statusTeacher);

//?ADD TEACHER
teachers.post("/add", addTeacher);

//?EDIT TEACHER
teachers.put("/edit", editTeacher);

//?ADD CLASS TO TEACHER
teachers.put("/addClass", addClass);

//?DELETE CLASS TO TEACHER
teachers.put("/deleteClass", deleteClass);