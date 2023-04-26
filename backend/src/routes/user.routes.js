import { Router } from "express";
import { getUsers } from "../controllers/user.controllers.js";

export const routerUsers = Router();

//("/api/users")
routerUsers.get('/', getUsers)
