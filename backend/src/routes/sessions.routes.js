import { Router } from "express";
import { getSession, registerUser, loginUser, logoutUser } from "../controllers/session.controllers.js";
import { sendResetToken, resetUserPassword } from "../controllers/session.controllers.js";

export const routerSession = Router()

//("api/session")
routerSession.post("/register", registerUser);
routerSession.post("/login", loginUser);

routerSession.get("/logout", logoutUser);
routerSession.get("/current", getSession);

routerSession.post("/password/forgot", sendResetToken )
routerSession.post("/password/reset", resetUserPassword )