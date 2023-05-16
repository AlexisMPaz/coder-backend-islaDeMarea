import mockingModel from "../models/MongoDB/mockingModel.js";
import CustomError from "../utils/customErrors/CustomError.js";
import { EErrors } from "../utils/customErrors/enums.js";

export const findMocking = async () => {
    try {
        return await mockingModel.find();
    } catch (error) {
        CustomError.createError({
            name: "Error en la base de datos.",
            message: "No se encontraron los productos de prueba.",
            cause: error.message,
            code: EErrors.DATABASE_ERROR
        })
    }
}

export const insertMocking = async (products) => {
    try {
        return await mockingModel.insertMany(products);
    } catch (error) {
        CustomError.createError({
            name: "Error en la base de datos.",
            message: "No se pudieron crear los productos de prueba.",
            cause: error.message,
            code: EErrors.DATABASE_ERROR
        })
    }
}