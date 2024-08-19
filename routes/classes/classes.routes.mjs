import { Router } from "express";

import {
    getClasses,
    
} from "../../controllers/classes/classes.controller.mjs";

export const classes = Router();

//?GET ALL CLASSES

classes.get("/", getClasses);