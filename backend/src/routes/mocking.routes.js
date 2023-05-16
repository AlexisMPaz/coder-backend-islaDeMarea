import { Router } from "express";
import { mockingProducts } from "../controllers/mocking.controllers.js";

export const routerMocking = Router();

routerMocking.get('/mockingproducts', mockingProducts);