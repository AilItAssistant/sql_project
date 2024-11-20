import { Router } from "express";

import { verifyToken } from "../../controllers/users/users.controller.mjs";
import {
    getCities,
} from "../../controllers/cities/cities.controller.mjs";

export const cities = Router();

//?GET ALL CITIES
cities.get("/", verifyToken, getCities);