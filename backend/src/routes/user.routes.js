import { Router } from "express";
import { getUsers } from "../controllers/user.controllers.js";
import { passportError, roleValidation } from "../config/middlewares.js";

export const routerUsers = Router();

//("/api/users")
routerUsers.get('/', passportError("jwt"), roleValidation("Admin"), getUsers)
