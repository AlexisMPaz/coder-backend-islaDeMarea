import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;

const requester = supertest('http://localhost:8080');

//Test carts
describe("Testing de las rutas de carts", () => {
    let token = ""
    let newProductId = ""

    //Login con usuario normal
    it("Ruta: api/session/login con el metodo POST", async function () {
        const newUser = {
            email: "test@user.com",
            password: "testuser"
        }

        const response = await requester.post('/api/session/login').send(newUser)
        const tokenResult = response.headers['set-cookie'][0]

        //Verifica que exista la token en la respuesta
        expect(tokenResult).to.be.ok

        token = {
            name: tokenResult.split("=")[0],
            value: tokenResult.split("=")[1],
        }

        //Comprueba que el status es 200
        expect(response.body.status).to.equal("success");

        console.log("Ruta de login")
        console.log(`Status: ${response.body.status}`)
        console.log(`Message: ${response.body.message}`)


        //Verifica el nombre y el valor de la Token
        expect(token.name).to.be.ok.and.equal('jwt')
        expect(token.value).to.be.ok

        console.log(`Token: ${token.name} = ${token.value}`)
    })


    //Obtiene el carrito con el array de productos vacío
    it("Ruta: api/carts con el metodo GET", async function () {

        const { _body } = await requester
            .get('/api/carts')
            .set('Cookie', [`${token.name}=${token.value}`])

        //Comprueba que el status es 200
        expect(_body.status).to.equal("success");

        console.log("Ruta para Obtener el carrito")
        console.log(`Status: ${_body.status}`)
        console.log(`Message: ${_body.message}`)
        console.log("Cart Populate:", JSON.stringify(_body.payload, null, 2))
    })

    //Actualiza los productos del carrito con un array
    it("Ruta: api/carts con el metodo PUT", async function () {

        const products = [
            {
                productId: "6484ef9c0ef3f7cd1fec80af",
                quantity: 2
            },
            {
                productId: "6484ef9c0ef3f7cd1fec80ad",
                quantity: 5
            },
            {
                productId: "6484ef9c0ef3f7cd1fec80ae",
                quantity: 1
            },
            {
                productId: "6484ef9c0ef3f7cd1fec80ab",
            }
        ]



        const { _body } = await requester
            .put('/api/carts')
            .send(products)
            .set('Cookie', [`${token.name}=${token.value}`])

        //Comprueba que el status es 200
        expect(_body.status).to.equal("success");

        console.log("Ruta para modificar el array de productos del carrito.")
        console.log(`Status: ${_body.status}`)
        console.log(`Message: ${_body.message}`)
        console.log("Cart:", JSON.stringify(_body.payload, null, 2))
    })

    //Actualiza la cantidad de un producto
    it("Ruta: api/carts/product/pid con el metodo PUT", async function () {
        const pid = "6484ef9c0ef3f7cd1fec80ab"
        const newQuantity = { quantity: "5" }

        const { _body } = await requester
            .put(`/api/carts/product/${pid}`)
            .send(newQuantity)
            .set('Cookie', [`${token.name}=${token.value}`])

        //Comprueba que el status es 200
        expect(_body.status).to.equal("success");

        console.log("Ruta para actualizar la cantidad de un producto dentro del carrito")
        console.log(`Status: ${_body.status}`)
        console.log(`Message: ${_body.message}`)
        console.log("Cart:", JSON.stringify(_body.payload, null, 2))
    })

    //Borra todos los productos
    it("Ruta: api/carts con el metodo DELETE", async function () {

        const { _body } = await requester
            .delete('/api/carts')
            .set('Cookie', [`${token.name}=${token.value}`])

        //Comprueba que el status es 200
        expect(_body.status).to.equal("success");

        console.log("Ruta para borrar los productos del carrito")
        console.log(`Status: ${_body.status}`)
        console.log(`Message: ${_body.message}`)
        console.log("Cart:", JSON.stringify(_body.payload, null, 2))
    })

    //Ingresa un producto al carrito por el Id 2
    it("Ruta: api/carts/product/pid con el metodo POST", async function () {

        const pid = "6484ef9c0ef3f7cd1fec80ab"

        await requester
            .post(`/api/carts/product/${pid}`)
            .set('Cookie', [`${token.name}=${token.value}`])

        const { _body } = await requester
            .post(`/api/carts/product/${pid}`)
            .set('Cookie', [`${token.name}=${token.value}`])

        //Comprueba que el status es 200
        expect(_body.status).to.equal("success");

        console.log("Agregar el mismo producto 2 veces")
        console.log(`Status: ${_body.status}`)
        console.log(`Message: ${_body.message}`)
        console.log("Cart:", JSON.stringify(_body.payload, null, 2))
    })

    //Finaliza la compra creando y mostrando el Ticket
    it("Ruta: api/carts/purshase con el metodo POST", async function () {

        const { _body } = await requester
            .post(`/api/carts/purchase`)
            .set('Cookie', [`${token.name}=${token.value}`])

        //Comprueba que el status es 200
        expect(_body.status).to.equal("success");

        console.log("Termina la compra y devuelve el ticket")
        console.log(`Status: ${_body.status}`)
        console.log(`Message: ${_body.message}`)
        console.log("Ticket:", JSON.stringify(_body.payload, null, 2))
    })
})