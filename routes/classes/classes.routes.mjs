import { Router } from "express";

import {
    getClasses,
    filterClasses,
    statusClasse,
    deleteClasse,
    editClasse,
    addClasse
} from "../../controllers/classes/classes.controller.mjs";

export const classes = Router();

//?GET ALL CLASSES
classes.get("/", getClasses);

//?GET CLASSES WITH FILTER
classes.put("/filter", filterClasses);

//?MODIFY STATUS TO CLASSES
classes.put("/status", statusClasse);

//?DELETE CLASSES
classes.put("/delete", deleteClasse);

//?EDIT CLASSES
classes.put("/edit", editClasse);

//?ADD CLASSES
classes.post("/add", addClasse);