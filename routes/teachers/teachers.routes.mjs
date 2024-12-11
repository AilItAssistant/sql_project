import { Router } from "express";

import { verifyToken } from "../../controllers/users/users.controller.mjs";
import {
    beforeCRUD,
    afterCRUD,
    add,
    filter
} from "../../controllers/user_actions/user_actions.controller.mjs";

import {
    getTeachers,
    filterTeachers,
    deleteTeacher,
    statusTeacher,
    addTeacher,
    editTeacher,
    addClass,
    deleteClass,
    teacherByClassId
} from "../../controllers/teachers/teachers.controller.mjs";

export const teachers = Router();

//?GET ALL TEACHERS
teachers.get("/", verifyToken, getTeachers);

//?GET ALL TEACHERS WITH FILTERS
teachers.put("/filter", verifyToken, filter,  filterTeachers);

//?DELETE TEACHER BY ID
teachers.put("/delete", verifyToken, beforeCRUD, deleteTeacher);

//?CHANGE STATUS
teachers.put("/status", verifyToken, beforeCRUD, statusTeacher, afterCRUD);

//?ADD TEACHER
teachers.post("/add", verifyToken, add, addTeacher);

//?EDIT TEACHER
teachers.put("/edit", verifyToken, beforeCRUD, editTeacher, afterCRUD);

//?ADD CLASS TO TEACHER
teachers.put("/addClass", verifyToken, addClass);

//?DELETE CLASS TO TEACHER
teachers.put("/deleteClass", verifyToken, deleteClass);

//?TEACHERS BY CLASSID
teachers.put("/teachersByClassId", verifyToken, teacherByClassId);