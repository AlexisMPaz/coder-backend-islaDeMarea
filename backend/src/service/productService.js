import productModel from "../models/MongoDB/productModel.js"
import CustomError from "../utils/customErrors/CustomError.js";
import { EErrors } from "../utils/customErrors/enums.js";

export const  createProduct = async (product) => {
    try {
        const newProduct = await productModel(product)
        await newProduct.save()
        return newProduct
    } catch (error) {
        CustomError.createError({
            name: "Error en la base de datos.",
            message: "No se pudo crear el producto.",
            cause: error.message,
            code: EErrors.DATABASE_ERROR
        })
    }
  };
  

export const paginateProducts = async (filters, options) => {
    try {
        return await productModel.paginate(filters, options);
    } catch (error) {
        CustomError.createError({
            name: "Error en la base de datos.",
            message: "No se encontraron los productos.",
            cause: error.message,
            code: EErrors.DATABASE_ERROR
        })
    }
}

export const findProducts = async () => {
    try {
        return await productModel.find();
    } catch (error) {
        CustomError.createError({
            name: "Error en la base de datos.",
            message: "No se encontraron los productos",
            cause: error.message,
            code: EErrors.DATABASE_ERROR
        })
    }
}

export const findProductById = async (id) => {
    try {
        return await productModel.findById(id);
    } catch (error) {
        CustomError.createError({
            name: "Error en la base de datos.",
            message: "No se pudo buscar el producto.",
            cause: error.message,
            code: EErrors.DATABASE_ERROR
        })
    }
}


export const deleteOneProduct = async (id) => {
    try {
        return await productModel.findByIdAndDelete(id);
    } catch (error) {
        CustomError.createError({
            name: "Error en la base de datos.",
            message: "No se pudo eliminar el producto.",
            cause: error.message,
            code: EErrors.DATABASE_ERROR
        })
    }
}

export const updateOneProduct = async (id, info) => {
    try {
        return await productModel.findByIdAndUpdate(id, info);
    } catch (error) {
        CustomError.createError({
            name: "Error en la base de datos.",
            message: "No se pudo actualizar el producto.",
            cause: error.message,
            code: EErrors.DATABASE_ERROR
        })
    }
}
