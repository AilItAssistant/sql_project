import { Router } from "express";

import {
    getAccommodations,
    
} from "../controllers/accommodations/accommodations.controller.mjs";

export const accommodations = Router();

//?GET ALL ACCOMMODATIONS

accommodations.get("/", getAccommodations);

