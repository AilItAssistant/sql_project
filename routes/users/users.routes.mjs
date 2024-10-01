import { Router } from "express";

import {
    getUsers,
    filterUsers,
    statusUsers,
    deleteUsers,
    editUsers,
    addUsers,
    login,
    verifyToken
} from "../../controllers/users/users.controller.mjs";

export const users = Router();

//?GET ALL USERS
users.get("/", verifyToken, getUsers);

//?GET ALL USERS WITH FILTERS
users.put("/filter", filterUsers);

//?MODIFY STATUS TO USERS
users.put("/status", statusUsers);

//?DELETE USERS
users.put("/delete", deleteUsers);

//?EDIT USERS
users.put("/edit", editUsers);

//?ADD USERS
users.post("/add", addUsers);

//?LOG IN
users.post("/login", login);

//?VERIFY TOKEN
users.post("/verify", verifyToken);