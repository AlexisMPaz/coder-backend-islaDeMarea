import { Router } from "express";
import { getCart, updateCartProducts, addProductToCart, updateProductQuantity, deleteCartProducts, deleteCartProduct, createTicket } from "../controllers/cart.controllers.js";
import { passportError } from "../config/middlewares/passportError.js";
import { roleValidation } from "../config/middlewares/roleValidation.js";

export const routerCarts = Router();


//("api/carts")
routerCarts.get('/', passportError("jwt"), roleValidation("Usuario"), getCart);
routerCarts.put('/', passportError("jwt"), roleValidation("Usuario"), updateCartProducts);
routerCarts.post('/product/:pid', passportError("jwt"), roleValidation("Usuario"), addProductToCart);
routerCarts.put('/product/:pid', passportError("jwt"), roleValidation("Usuario"), updateProductQuantity);
routerCarts.delete('/', passportError("jwt"), roleValidation("Usuario"), deleteCartProducts);
routerCarts.delete('/product/:pid', passportError("jwt"), roleValidation("Usuario"), deleteCartProduct);
routerCarts.post('/purchase', passportError("jwt"), roleValidation("Usuario"),  createTicket);

