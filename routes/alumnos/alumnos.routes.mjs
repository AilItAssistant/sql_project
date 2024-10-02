import { Router } from "express";

import { verifyToken } from "../../controllers/users/users.controller.mjs";
import {
    getAlumnos,
    filterAlumnos,
    statusAlumno,
    deleteAlumno,
    editAlumno,
    addAlumno,
    addClass,
    deleteClass,
    alumnoByClassId,
    addAlumnoToClass,
    deleteAlumnoToClass
} from "../../controllers/alumnos/alumnos.controller.mjs";

export const alumnos = Router();

//?GET ALL ALUMNOS
alumnos.get("/", verifyToken, getAlumnos);

//??GET ALUMNOS 
alumnos.put("/filter", verifyToken, filterAlumnos);

//?MODIFY STATUS TO ALUMNOS
alumnos.put("/status", verifyToken, statusAlumno);

//?DELETE ALUMNO
alumnos.put("/delete", verifyToken, deleteAlumno);

//?EDIT ALUMNO
alumnos.put("/edit", verifyToken, editAlumno);

//?ADD ALUMNO
alumnos.post("/add", verifyToken, addAlumno);

//?ADD CLASS TO ALUMNO
alumnos.put("/addClass", verifyToken, addClass);

//?DELETE CLASS TO ALUMNO
alumnos.put("/deleteClass", verifyToken, deleteClass);

//?STUDENTS BY CLASSID       
alumnos.put("/alumnosByClassId", verifyToken, alumnoByClassId);

//?ADD STUDENT TO CLASS  
alumnos.put("/addStudentToClass", verifyToken, addAlumnoToClass);

//?DELETE STUDENT TO CLASS
alumnos.put("/deleteStudentToClass", verifyToken, deleteAlumnoToClass);