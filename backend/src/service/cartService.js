import cartModel from "../models/MongoDB/cartModel.js";
import productModel from "../models/MongoDB/productModel.js";
import CustomError from "../utils/customErrors/CustomError.js";
import { EErrors } from "../utils/customErrors/enums.js";


export const findCartById = async (id) => {
    try {
        return await cartModel.findById(id);
    } catch (error) {
        CustomError.createError({
            name: "Error en la base de datos.",
            message: "No se ha encontrado el carrito.",
            cause: error.message,
            code: EErrors.DATABASE_ERROR
        })
    }
}

export const createCart = async () => {
    try {
        const newCart = await cartModel()
        await newCart.save()
        return newCart
    } catch (error) {
        CustomError.createError({
            name: "Error en la base de datos.",
            message: "No se ha podido crear el carrito.",
            cause: error.message,
            code: EErrors.DATABASE_ERROR
        })
    }
}

export const deleteCart = async (id) => {
    try {
        return await cartModel.findByIdAndDelete(id);
    } catch (error) {
        CustomError.createError({
            name: "Error en la base de datos.",
            message: "No se ha podido borrar el carrito.",
            cause: error.message,
            code: EErrors.DATABASE_ERROR
        })
    }
}

export const updateCart = async (id, info) => {
    try {
        const cart = await cartModel.findByIdAndUpdate(id, info, { new: true });

        let total = 0;
        for (const productInCart of cart.products) {
            const product = await productModel.findById(productInCart.productId);
            total += product.price * productInCart.quantity;
        }
        cart.total = total;

        cart.save()

        return cart;

    } catch (error) {
        CustomError.createError({
            name: "Error en la base de datos.",
            message: "No se ha podido actualizar el carrito.",
            cause: error.message,
            code: EErrors.DATABASE_ERROR
        })
    }
}
