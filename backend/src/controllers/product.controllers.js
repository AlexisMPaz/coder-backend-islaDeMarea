import { findProductById, createProduct, updateOneProduct, paginateProducts, deleteOneProduct } from "../service/productService.js";
import CustomError from "../utils/customErrors/CustomError.js";
import { generateProductErrorInfo } from "../utils/customErrors/info.js";
import { EErrors } from "../utils/customErrors/enums.js";

export const getProducts = async (req, res, next) => {
    const { limit = 10, page = 1, sort = "", category = "" } = req.query;

    const filters = { stock: { $gt: 0 } };
    if (category) filters.category = category;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
    };
    if (sort) options.sort = { price: sort === 'desc' ? -1 : 1 }

    try {
        const products = await paginateProducts(filters, options);

        const prevLink = products.hasPrevPage ? `/api/products?category=${category}&limit=${limit}&sort=${sort}&page=${products.prevPage}` : null
        const nextLink = products.hasNextPage ? `/api/products?category=${category}&limit=${limit}&sort=${sort}&page=${products.nextPage}` : null

        return res.status(200).send({
            status: "success",
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: prevLink,
            nextLink: nextLink
        })
    } catch (error) {
        next(error)
    }
}

export const getProduct = async (req, res, next) => {
    const idProduct = req.params.pid;

    try {
        const product = await findProductById(idProduct);
        return res.status(200).json(product)

    } catch (error) {
        next(error)
    }
}

export const postProduct = async (req, res, next) => {
    const productInfo = req.body;
    try {
        const requiredFields = ['title', 'description', 'price', 'code', 'stock', 'category'];

        if (requiredFields.every((field) => productInfo[field])) {
            const product = await createProduct(productInfo);
            res.status(200).send({
                message: 'Producto agregado correctamente',
                product: product
            });
        } else {
            CustomError.createError({
                name: "Error creando el Producto",
                message: "No se pudo crear el producto",
                cause: generateProductErrorInfo(productInfo),
                code: EErrors.MISSING_FIELDS_ERROR
            })
        }

    } catch (error) {
        next(error)
    }
}

export const updateProduct = async (req, res, next) => {
    const idProduct = req.params.pid;
    const info = req.body;

    try {
        const product = await updateOneProduct(idProduct, info);

        if (product) {
            return res.status(200).json({
                message: "Producto actualizado"
            });
        }

        res.status(200).json({
            message: "Producto no encontrado"
        });

    } catch (error) {
        next(error)
    }
}

export const deleteProduct = async (req, res, next) => {
    const idProduct = req.params.pid;

    try {
        const product = await deleteOneProduct(idProduct);

        if (product) {
            return res.status(200).json({
                message: "Producto eliminado"
            });
        }

        res.status(200).json({
            message: "Producto no encontrado"
        });

    } catch (error) {
        next(error)
    }
}