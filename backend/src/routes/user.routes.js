import { Router } from "express";
import { getUsers} from "../controllers/user.controllers.js";
import { passportError } from "../config/middlewares/passportError.js";
import { roleValidation } from "../config/middlewares/roleValidation.js";

export const routerUsers = Router();

//("/api/users")
routerUsers.get('/', passportError("jwt"), roleValidation(["admin"]), getUsers);
