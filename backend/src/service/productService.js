import productModel from "../models/MongoDB/productModel.js"

export const findProducts = async () => {
    try {
        return await productModel.find();
    } catch (error) {
        throw new Error(error);
    }
}

export const findProductById = async (id) => {
    try {
        return await productModel.findById(id);
    } catch (error) {
        throw new Error(error);
    }
}

export const paginateProducts = async (filters, options) => {
    try {
        return await productModel.paginate(filters, options);
    } catch (error) {
        throw error
    }
}

export const insertProducts = async (products) => {
    try {
        return await productModel.insertMany(products);
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteOneProduct = async (id) => {
    try {
        return await productModel.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
    }
}

export const updateOneProduct = async (id, info) => {
    try {
        return await productModel.findByIdAndUpdate(id, info);
    } catch (error) {
        throw new Error(error);
    }
}
