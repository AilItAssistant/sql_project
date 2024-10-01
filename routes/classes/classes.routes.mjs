import { Router } from "express";

import { verifyToken } from "../../controllers/users/users.controller.mjs";

import {
    getClasses,
    filterClasses,
    statusClass,
    deleteClass,
    editClass,
    addClass, 
    getClassesByStudentId,
    getClassesByTeacherId
} from "../../controllers/classes/classes.controller.mjs";

export const classes = Router();

//?GET ALL CLASSES
classes.get("/", verifyToken, getClasses);

//?GET CLASSES WITH FILTER
classes.put("/filter", verifyToken, filterClasses);

//?MODIFY STATUS TO CLASSES
classes.put("/status", verifyToken, statusClass);

//?DELETE CLASSES
classes.put("/delete", verifyToken, deleteClass);

//?EDIT CLASSES
classes.put("/edit", verifyToken, editClass);

//?ADD CLASSES
classes.post("/add", verifyToken, addClass);

//?SEARCH CLASSES BY ALUMNO ID
classes.put("/studentId", verifyToken, getClassesByStudentId);

//?SEARCH CLASSES BY TEACHER ID
classes.put("/teacherId", verifyToken, getClassesByTeacherId);