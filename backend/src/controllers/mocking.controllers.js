import { findMocking, insertMocking } from "../service/mockingService.js";
import { faker } from '@faker-js/faker'

export const mockingProducts = async (req, res) => {
    const products = [];

    const createRandomProduct = () => {
        return {
            title: faker.commerce.product(),
            description: faker.commerce.productDescription(),
            code: faker.string.alphanumeric(10),
            price: faker.commerce.price({ min: 1000, max: 10000, dec: 0 }),
            stock: faker.string.numeric(2),
            category: faker.commerce.department(),
            thumbnail: [
                faker.image.url(640, 480, 'cat'),
                faker.image.url(320, 240, 'cat')
            ]
        }
    }

    for (let i = 0; i<100; i++) {
        products.push(createRandomProduct());
    }
    
    try {

        await insertMocking(products);

        const productsDB = await findMocking();

        res.status(200).send({
            message:"Productos encontrados",
            payload: productsDB
        })

    } catch (error) {
        next(error)
    }
}