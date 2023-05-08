import { Router } from "express";
import { getSession, registerUser, loginUser, logoutUser } from "../controllers/session.controllers.js";

export const routerSession = Router()

//("api/session")
routerSession.post("/register", registerUser)
routerSession.post("/login", loginUser)

routerSession.get("/logout", logoutUser);
routerSession.get("/current", getSession);