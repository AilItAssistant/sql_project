import { Router } from "express";

import {
    beforeCRUD,
    afterCRUD,
    add,
    filter
} from "../../controllers/user_actions/user_actions.controller.mjs";

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
users.put("/filter", verifyToken, filter, filterUsers);

//?MODIFY STATUS TO USERS
users.put("/status", verifyToken, beforeCRUD, statusUsers, afterCRUD);

//?DELETE USERS
users.put("/delete", verifyToken, beforeCRUD, deleteUsers);

//?EDIT USERS
users.put("/edit", verifyToken, beforeCRUD, editUsers, afterCRUD);

//?ADD USERS
users.post("/add", verifyToken, add, addUsers);

//?LOG IN
users.post("/login", login);

//?VERIFY TOKEN
users.get("/verify", verifyToken);

//?VERIFY TOKEN TO HEADER
users.get("/verifyHeader", verifyTokenHeader);