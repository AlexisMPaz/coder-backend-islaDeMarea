import { Router } from "express";
import { getCart, updateCartProducts, addProductToCart, updateProductQuantity, deleteCartProducts, deleteCartProduct, createTicket } from "../controllers/cart.controllers.js";
import { passportError } from "../config/middlewares/passportError.js";
import { roleValidation } from "../config/middlewares/roleValidation.js";

export const routerCarts = Router();


//("api/carts")
routerCarts.get('/', passportError("jwt"), roleValidation(["usuario", "premium"]), getCart);
routerCarts.put('/', passportError("jwt"), roleValidation(["usuario", "premium"]), updateCartProducts);
routerCarts.post('/product/:pid', passportError("jwt"), roleValidation(["usuario", "premium"]), addProductToCart);
routerCarts.put('/product/:pid', passportError("jwt"), roleValidation(["usuario", "premium"]), updateProductQuantity);
routerCarts.delete('/', passportError("jwt"), roleValidation(["usuario", "premium"]), deleteCartProducts);
routerCarts.delete('/product/:pid', passportError("jwt"), roleValidation(["usuario", "premium"]), deleteCartProduct);
routerCarts.post('/purchase', passportError("jwt"), roleValidation(["usuario", "premium"]),  createTicket);

