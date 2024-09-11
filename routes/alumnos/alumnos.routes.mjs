import { Router } from "express";

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
alumnos.get("/", getAlumnos);

//??GET ALUMNOS 
alumnos.put("/filter", filterAlumnos);

//?MODIFY STATUS TO ALUMNOS
alumnos.put("/status", statusAlumno);

//?DELETE ALUMNO
alumnos.put("/delete", deleteAlumno);

//?EDIT ALUMNO
alumnos.put("/edit", editAlumno);

//?ADD ALUMNO
alumnos.post("/add", addAlumno);

//?ADD CLASS TO ALUMNO
alumnos.put("/addClass", addClass);

//?DELETE CLASS TO ALUMNO
alumnos.put("/deleteClass", deleteClass);

//?STUDENTS BY CLASSID       
alumnos.put("/alumnosByClassId", alumnoByClassId);

//?ADD STUDENT TO CLASS  
alumnos.put("/addStudentToClass", addAlumnoToClass);

//?DELETE STUDENT TO CLASS
alumnos.put("/deleteStudentToClass", deleteAlumnoToClass);