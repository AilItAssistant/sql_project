import { Router } from "express";

import { verifyToken } from "../../controllers/users/users.controller.mjs"
import {
    getTeachers,
    filterTeachers,
    deleteTeacher,
    statusTeacher,
    addTeacher,
    editTeacher,
    addClass,
    deleteClass,
    teacherByClassId,
    addTeacherToClass,
    deleteTeacherToClass
} from "../../controllers/teachers/teachers.controller.mjs";

export const teachers = Router();

//?GET ALL TEACHERS
teachers.get("/", verifyToken, getTeachers);

//?GET ALL TEACHERS WITH FILTERS
teachers.put("/filter", verifyToken, filterTeachers);

//?DELETE TEACHER BY ID
teachers.put("/delete", verifyToken, deleteTeacher);

//?CHANGE STATUS
teachers.put("/status", verifyToken, statusTeacher);

//?ADD TEACHER
teachers.post("/add", verifyToken, addTeacher);

//?EDIT TEACHER
teachers.put("/edit", verifyToken, editTeacher);

//?ADD CLASS TO TEACHER
teachers.put("/addClass", verifyToken, addClass);

//?DELETE CLASS TO TEACHER
teachers.put("/deleteClass", verifyToken, deleteClass);

//?TEACHERS BY CLASSID       
teachers.put("/teachersByClassId", verifyToken, teacherByClassId);

//?ADD TEACHER TO CLASS  
teachers.put("/addTeacherToClass", verifyToken, addTeacherToClass);

//?DELETE TEACHER TO CLASS
teachers.put("/deleteTeacherToClass", verifyToken, deleteTeacherToClass);