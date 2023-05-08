import { Router } from "express";
import { getProducts, getProduct, addProducts, updateProduct, deleteProduct } from "../controllers/product.controllers.js";
import { passportError, roleValidation } from "../config/middlewares.js";

export const routerProduct = Router();

//("api/products")
routerProduct.get('/', getProducts);
routerProduct.get('/:pid', getProduct);
routerProduct.post('/', passportError("jwt"), roleValidation("Admin"), addProducts);
routerProduct.put('/:pid', passportError("jwt"), roleValidation("Admin"), updateProduct);
routerProduct.delete('/:pid', passportError("jwt"), roleValidation("Admin"), deleteProduct);