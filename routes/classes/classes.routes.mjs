import { Router } from "express";

import {
    getClasses,
    filterClasses,
    statusClass,
    deleteClass,
    editClass,
    addClass, 
    getClassesByStudentId
} from "../../controllers/classes/classes.controller.mjs";

export const classes = Router();

//?GET ALL CLASSES
classes.get("/", getClasses);

//?GET CLASSES WITH FILTER
classes.put("/filter", filterClasses);

//?MODIFY STATUS TO CLASSES
classes.put("/status", statusClass);

//?DELETE CLASSES
classes.put("/delete", deleteClass);

//?EDIT CLASSES
classes.put("/edit", editClass);

//?ADD CLASSES
classes.post("/add", addClass);

//?SEARCH CLASSES BY ALUMNO ID
classes.put("/studentId", getClassesByStudentId);