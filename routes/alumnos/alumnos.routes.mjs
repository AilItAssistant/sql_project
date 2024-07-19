import { Router } from "express";

import {
    getAlumnos,
    
} from "../../controllers/alumnos/alumnos.controller.mjs";

export const alumnos = Router();

//?GET ALL ALUMNOS

alumnos.get("/", getAlumnos);