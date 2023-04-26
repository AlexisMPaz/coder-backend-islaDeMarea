import { Router } from "express";
import { destroySession, getSession, registerUser, loginUser } from "../controllers/session.controllers.js";

export const routerSession = Router()

//("api/session")
routerSession.post("/register", registerUser)
routerSession.post("/login", loginUser)

routerSession.get("/logout", destroySession);
routerSession.get("/current", getSession);