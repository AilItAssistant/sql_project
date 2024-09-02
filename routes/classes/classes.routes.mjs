import { Router } from "express";

import {
    getClasses,
    filterClasses
} from "../../controllers/classes/classes.controller.mjs";

export const classes = Router();

//?GET ALL CLASSES
classes.get("/", getClasses);

//?GET CLASSES WITH FILTER
classes.put("/filter", filterClasses);