import { Router } from "express";

import {
    getUsers,
    filterUsers,
    statusUsers,
    deleteUsers,
    editUsers,
    addUsers,
    login,
    verifyToken,
    verifyTokenHeader
} from "../../controllers/users/users.controller.mjs";

export const users = Router();

//?GET ALL USERS
users.get("/", verifyToken, getUsers);

//?GET ALL USERS WITH FILTERS
users.put("/filter", verifyToken, filterUsers);

//?MODIFY STATUS TO USERS
users.put("/status", verifyToken, statusUsers);

//?DELETE USERS
users.put("/delete", verifyToken, deleteUsers);

//?EDIT USERS
users.put("/edit", verifyToken, editUsers);

//?ADD USERS
users.post("/add", verifyToken, addUsers);

//?LOG IN
users.post("/login", login);

//?VERIFY TOKEN
users.get("/verify", verifyToken);

//?VERIFY TOKEN TO HEADER
users.get("/verifyHeader", verifyTokenHeader);