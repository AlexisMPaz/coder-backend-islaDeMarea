import { Router } from "express";
import { passportError, roleValidation } from "../config/middlewares.js";
import { postMessage, getMessages } from "../controllers/chat.controllers.js";

export const routerChat = Router();

//("api/chat")
routerChat.post('/', passportError("jwt"), roleValidation("Usuario"), postMessage);
routerChat.get('/', passportError("jwt"), getMessages);