import cartModel from "../models/MongoDB/cartModel.js";
import productModel from "../models/MongoDB/productModel.js";


export const findCartById = async (id) => {
    try {
        return await cartModel.findById(id);
    } catch (error) {
        throw new Error(error);
    }
}

export const createCart = async () => {
    try {
        const newCart = await cartModel()
        await newCart.save()
        return newCart
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteCart = async (id) => {
    try {
        return await cartModel.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
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
        throw new Error(error);
    }
}
