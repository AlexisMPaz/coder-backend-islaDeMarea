import userModel from "../models/MongoDB/userModel.js";
import CustomError from "../utils/customErrors/CustomError.js";
import { EErrors } from "../utils/customErrors/enums.js";

export const findUsers = async () => {
    try {
        return await userModel.find();
    } catch (error) {
        CustomError.createError({
            name: "Error en la base de datos.",
            message: "No se pudo encontrar a los usuarios.",
            cause: error.message,
            code: EErrors.DATABASE_ERROR
        })
    }
}

export const findUserById = async (id) => {
    try {
        return await userModel.findById(id);
    } catch (error) {
        CustomError.createError({
            name: "Error en la base de datos.",
            message: "No se pudo encontrar al usuario.",
            cause: error.message,
            code: EErrors.DATABASE_ERROR
        })
    }
}

export const findUserByEmail = async (email) => {
    try {
        const user = await userModel.findOne({ email: email });
        return user
    } catch (error) {
        CustomError.createError({
            name: "Error en la base de datos.",
            message: "No se pudo encontrar al usuario.",
            cause: error.message,
            code: EErrors.DATABASE_ERROR
        })
    }
}

export const createUser = async (user) => {
    try {
        const newUser = await userModel.create(user);
        return newUser;
    } catch (error) {
        CustomError.createError({
            name: "Error en la base de datos.",
            message: "No se pudo crear el usuario.",
            cause: error.message,
            code: EErrors.DATABASE_ERROR
        })
    }
}

export const deleteUser = async (id) => {
    try {
        return await userModel.findByIdAndDelete(id);
    } catch (error) {
        CustomError.createError({
            name: "Error en la base de datos.",
            message: "No se pudo borrar el usuario.",
            cause: error.message,
            code: EErrors.DATABASE_ERROR
        })
    }
}

export const updateUser = async (id, info) => {
    try {
        return await userModel.findByIdAndUpdate(id, info);
    } catch (error) {
        CustomError.createError({
            name: "Error en la base de datos.",
            message: "No se pudo actualizar al usuario.",
            cause: error.message,
            code: EErrors.DATABASE_ERROR
        })
    }
}
