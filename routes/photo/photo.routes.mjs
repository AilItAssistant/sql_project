import { Router } from "express";

import  { verifyToken } from "../../controllers/users/users.controller.mjs";
import {
    getActivePhotoById
} from "../../controllers/photo/photo.controller.mjs";

export const photo = Router();

//?GET ACTIVE PHOTS BY ID
photo.post("/IdActive", verifyToken, getActivePhotoById);