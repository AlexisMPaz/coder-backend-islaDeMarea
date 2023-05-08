import { findCartById, updateCart } from "../service/cartService.js";
import { findProductById } from "../service/productService.js";
import { createNewTicket } from "../service/ticketService.js";
import productModel from "../models/MongoDB/productModel.js";

export const getCart = async (req, res) => {
    const idCart = req.user.idCart;

    try {
        const cart = await findCartById(idCart);
        const cartPopulate = await cart.populate({ path: "products.productId", model: productModel })
        res.status(200).json({ cartPopulate });

    } catch (error) {
        res.status(500).send({
            message: "Hubo un error en el servidor",
            error: error.message
        })
    }
}

export const updateCartProducts = async (req, res) => {

    const idCart = req.user.idCart;
    const info = req.body;

    try {
        await updateCart(idCart, { products: info });
        return res.status(200).send("Carrito actualizado")

    } catch (error) {
        res.status(500).send({
            message: "Hubo un error en el servidor",
            error: error.message
        })
    }
}

export const addProductToCart = async (req, res) => {

    const idCart = req.user.idCart;
    const idProduct = req.params.pid;

    try {
        const realProduct = await findProductById(idProduct);

        if (realProduct) {
            const cart = await findCartById(idCart);
            const productIndex = cart.products.findIndex(product => product.productId.equals(idProduct));
            if (productIndex === -1) {
                cart.products.push({ productId: idProduct });
            } else {
                cart.products[productIndex].quantity += 1;
            }
            await updateCart(idCart, cart);
            return res.status(200).send("Producto agregado al carrito")
        }

    } catch (error) {
        res.status(500).send({
            message: "Hubo un error en el servidor",
            error: error.message
        })
    }
}

export const updateProductQuantity = async (req, res) => {

    const { quantity } = req.body;

    const idCart = req.user.idCart;
    const idProduct = req.params.pid;
    const newQuantity = parseInt(quantity);

    try {
        const cart = await findCartById(idCart);
        const productIndex = cart.products.findIndex(product => product.productId.equals(idProduct));
        if (productIndex === -1) {
            throw new Error('El producto no existe en el carrito.');
        }
        cart.products[productIndex].quantity = newQuantity;
        await updateCart(idCart, cart);
        return res.status(200).send("Cantidad del producto actualizada")

    } catch (error) {
        res.status(500).send({
            message: "Hubo un error en el servidor",
            error: error.message
        })
    }
}

export const deleteCartProducts = async (req, res) => {

    const idCart = req.user.idCart;

    try {
        await updateCart(idCart, { products: [] });
        return res.status(200).send("Productos borrados")

    } catch (error) {
        res.status(500).send({
            message: "Hubo un error en el servidor",
            error: error.message
        })
    }
}

export const deleteCartProduct = async (req, res) => {

    const idCart = req.user.idCart;
    const idProduct = req.params.pid;

    try {
        const cart = await findCartById(idCart);
        const productIndex = cart.products.findIndex(product => product.productId.equals(idProduct));
        if (productIndex === -1) {
            throw new Error('El producto no existe en el carrito.');
        }
        cart.products.splice(productIndex, 1);
        await updateCart(idCart, cart);
        return res.status(200).send("El producto ha sido eliminado del carrito")

    } catch (error) {
        res.status(500).send({
            message: "Hubo un error en el servidor",
            error: error.message
        })
    }
}

export const createTicket = async (req, res) => {

    const idCart = req.user.idCart;
    const purchaser = req.user.email;

    try {
        const cart = await findCartById(idCart);
        const cartPopulate = await cart.populate({ path: "products.productId", model: productModel });

        const amount = cart.total;

        for (const productInCart of cartPopulate.products) {
            const product = productInCart.productId;
            const quantity = productInCart.quantity;
            if (quantity > product.stock) {
                const productIndex = cart.products.findIndex(product => product.productId.equals(product._id));
                cart.products.splice(productIndex, 1);
            }
        }

        const updatedCart = await updateCart(idCart, cart);

        if (updatedCart.total !== amount) {
            return res.status(400).send("Algunos productos no tienen suficiente stock");
        }

        const newTicket = await createNewTicket({amount, purchaser});

        for (const productInCart of cart.products) {
            const product = await findProductById(productInCart.productId);
            const quantity = productInCart.quantity;
            product.stock -= quantity;
            await product.save();
        }

        await updateCart(idCart, { products: [] });

        return res.status(200).send({message: "El Ticket ha sido creado", ticket: newTicket})

    } catch (error) {
        res.status(500).send({
            message: "Hubo un error en el servidor",
            error: error.message
        })
    }
}
