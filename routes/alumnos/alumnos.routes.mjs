import { Router } from "express";

import { verifyToken } from "../../controllers/users/users.controller.mjs";
import {
    beforeCRUD,
    afterCRUD,
    add,
    filter
} from "../../controllers/user_actions/user_actions.controller.mjs";

import {
    getAlumnos,
    filterAlumnos,
    statusAlumno,
    deleteAlumno,
    editAlumno,
    addAlumno,
    addClass,
    deleteClass,
    alumnoByClassId
} from "../../controllers/alumnos/alumnos.controller.mjs";

export const alumnos = Router();

//?GET ALL ALUMNOS
alumnos.get("/", verifyToken, getAlumnos);

//??GET ALUMNOS
alumnos.put("/filter", verifyToken, filter, filterAlumnos);

//?MODIFY STATUS TO ALUMNOS
alumnos.put("/status", verifyToken, beforeCRUD, statusAlumno, afterCRUD);

//?DELETE ALUMNO
alumnos.put("/delete", verifyToken, beforeCRUD, deleteAlumno);

//?EDIT ALUMNO
alumnos.put("/edit", verifyToken, beforeCRUD, editAlumno, afterCRUD);

//?ADD ALUMNO
alumnos.post("/add", verifyToken, add, addAlumno);

//?ADD CLASS TO ALUMNO
alumnos.put("/addClass", verifyToken, addClass);

//?DELETE CLASS TO ALUMNO
alumnos.put("/deleteClass", verifyToken, deleteClass);

//?STUDENTS BY CLASSID
alumnos.put("/alumnosByClassId", verifyToken, alumnoByClassId);