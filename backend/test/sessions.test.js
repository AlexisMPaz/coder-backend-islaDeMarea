import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;

const requester = supertest('http://localhost:8080');

//Test sesiones
describe("Testing de las rutas de sessions", () => {
    let token = ""

    //REGISTER
    it("Ruta: api/session/register con el metodo POST", async function () {
        const newUser = {
            first_name: "Test",
            last_name: "Session",
            email: "test@session.com",
            age: 18,
            password: "testsession"
        }

        const { _body } = await requester.post('/api/session/register').send(newUser)

        //Comprueba si el status es 200
        expect(_body.status).to.equal("success");
        console.log("Ruta de registro")
        console.log(`Status: ${_body.status}`)
    })

    //LOGIN
    it("Ruta: api/session/login con el metodo POST", async function () {
        const newUser = {
            email: "test@session.com",
            password: "testsession"
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


    //CURRENT
    it("Ruta: api/session/current con el metodo GET", async function () {
        const { _body } = await requester.get('/api/session/current').set('Cookie', [`${token.name}=${token.value}`])

        //Comprueba que el status es 200
        expect(_body.status).to.equal("success");
        expect(_body.payload.email).to.be.equal("test@session.com")
        console.log("Ruta Current")
        console.log(`Status: ${_body.status}`)
        console.log(`Message: ${_body.message}`)
        console.log("User:", JSON.stringify(_body.payload, null, 2))
    })

    //LOGOUT
    it("Ruta: api/session/logout con el metodo GET", async function () {
        const { _body } = await requester.get('/api/session/logout').set('Cookie', [`${token.name}=${token.value}`])

        //Comprueba que el status es 200
        expect(_body.status).to.equal("success");
        console.log("Ruta Logout")
        console.log(`Status: ${_body.status}`)
        console.log(`Message: ${_body.message}`)

    })
})


