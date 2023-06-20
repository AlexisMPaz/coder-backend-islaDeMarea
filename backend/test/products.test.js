import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;

const requester = supertest('http://localhost:8080');

//Test products
describe("Testing de las rutas de products", () => {
    let token = ""
    let newProductId = ""

    //Login con admin
    it("Ruta: api/session/login con el metodo POST", async function () {
        const newUser = {
            email: "adminCoder@coder.com",
            password: "adminCod3r123"
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


    //Get Products
    it("Ruta: api/products con el metodo GET", async function () {
        const limit = 3;

        const { _body } = await requester
            .get('/api/products')
            .query({ limit });

        //Comprueba que el status es 200
        expect(_body.status).to.equal("success");

        //Comprueba que el limit funciona cambiando el default
        expect(_body.payload.length).to.equal(limit);

        console.log("Ruta de Productos")
        console.log(`Status: ${_body.status}`)
        console.log(`Se han recibido ${limit} productos.`)
        console.log("Paginated Products:", JSON.stringify(_body, null, 2))
    })

    //Create Invalid Product

    it("Ruta: api/products con el metodo POST", async function () {
        const newProduct = {
            title: "Test",
            description: "Producto de prueba invalido"
        }

        const { _body } = await requester
            .post('/api/products')
            .send(newProduct)
            .set('Cookie', [`${token.name}=${token.value}`])

        //Comprueba que el status es 200
        expect(_body.status).to.equal("error");

        console.log("Ruta de Creacion de producto (invalido)")
        console.log(`Status: ${_body.status}`)
        console.log(`Message: ${_body.message}`)
    })

    //Create Product
    it("Ruta: api/products con el metodo POST", async function () {
        const newProduct = {
            title: "Test",
            description: "Producto de prueba",
            price: 1000,
            stock: 30,
            code: "ZZ9999",
            category: "armas"
        }

        const { _body } = await requester
            .post('/api/products')
            .send(newProduct)
            .set('Cookie', [`${token.name}=${token.value}`])

        //Comprueba que el status es 200
        expect(_body.status).to.equal("success");

        newProductId = _body.payload._id

        console.log("Ruta de Creacion de producto")
        console.log(`Status: ${_body.status}`)
        console.log(`Message: ${_body.message}`)
        console.log("Product:", JSON.stringify(_body.payload, null, 2))
    })

    //Get Product (id)
    it("Ruta: api/products con el metodo GET", async function () {
        const pid = newProductId;

        const { _body } = await requester.get(`/api/products/${pid}`)

        //Comprueba que el status es 200
        expect(_body.status).to.equal("success");

        console.log("Ruta de Producto por Id")
        console.log(`Status: ${_body.status}`)
        console.log(`Message: ${_body.message}`)

    })

    //Update Product (id)
    it("Ruta: api/products/pid con el metodo PUT", async function () {
        const pid = newProductId;

        const info = {
            title: "Test actualizado",
        }

        const { _body } = await requester
            .put(`/api/products/${pid}`)
            .send(info)
            .set('Cookie', [`${token.name}=${token.value}`])

        //Comprueba que el status es 200
        expect(_body.status).to.equal("success");

        console.log("Ruta de Actualizar producto")
        console.log(`Status: ${_body.status}`)
        console.log(`Message: ${_body.message}`)
        console.log("Product:", JSON.stringify(_body.payload, null, 2))
    })

    //Delete Product (id)
    it("Ruta: api/products/pid con el metodo DELETE", async function () {
        const pid = newProductId;

        const { _body } = await requester
            .delete(`/api/products/${pid}`)
            .set('Cookie', [`${token.name}=${token.value}`])

        //Comprueba que el status es 200
        expect(_body.status).to.equal("success");

        console.log("Ruta de Eliminar producto")
        console.log(`Status: ${_body.status}`)
        console.log(`Message: ${_body.message}`)
    })
})