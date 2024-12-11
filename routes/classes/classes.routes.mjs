import { Router } from "express";

import { verifyToken } from "../../controllers/users/users.controller.mjs";
import {
    beforeCRUD,
    afterCRUD,
    add,
    filter
} from "../../controllers/user_actions/user_actions.controller.mjs";

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
classes.put("/filter", verifyToken, filter, filterClasses);

//?MODIFY STATUS TO CLASSES
classes.put("/status", verifyToken, beforeCRUD, statusClass, afterCRUD);

//?DELETE CLASSES
classes.put("/delete", verifyToken, beforeCRUD, deleteClass);

//?EDIT CLASSES
classes.put("/edit", verifyToken, beforeCRUD, editClass, afterCRUD);

//?ADD CLASSES
classes.post("/add", verifyToken, add, addClass);

//?SEARCH CLASSES BY ALUMNO ID
classes.put("/studentId", verifyToken, getClassesByStudentId);

//?SEARCH CLASSES BY TEACHER ID
classes.put("/teacherId", verifyToken, getClassesByTeacherId);