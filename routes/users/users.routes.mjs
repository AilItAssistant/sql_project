import { Router } from "express";

import {
    getUsers,
    
} from "../../controllers/users/users.controller.mjs";

export const users = Router();

//?GET ALL USERS

users.get("/", getUsers);