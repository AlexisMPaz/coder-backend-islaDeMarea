import { Router } from "express";
import { passportError } from "../config/middlewares/passportError.js";
import { roleValidation } from "../config/middlewares/roleValidation.js";
import { postMessage, getMessages } from "../controllers/chat.controllers.js";

export const routerChat = Router();

//("api/chat")
routerChat.post('/', passportError("jwt"), roleValidation(["usuario", "premium"]), postMessage);
routerChat.get('/', passportError("jwt"), getMessages);