import { Router } from "express";

import {
    getAlumnos,
    filterAlumnos
} from "../../controllers/alumnos/alumnos.controller.mjs";

export const alumnos = Router();

//?GET ALL ALUMNOS
alumnos.get("/", getAlumnos);

//??GET ALUMNOS 
alumnos.put("/", filterAlumnos);