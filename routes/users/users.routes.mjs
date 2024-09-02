import { Router } from "express";

import {
    getUsers,
    filterUsers
} from "../../controllers/users/users.controller.mjs";

export const users = Router();

//?GET ALL USERS
users.get("/", getUsers);

//?GET ALL USERS WITH FILTERS
users.put("/filter", filterUsers);