import {app,sequelize} from "../express";
import request from "supertest";
import e from "express";


describe("E2E test for product", () => {
    beforeEach( async () => {
        await sequelize.sync({force: true})
    })

    afterAll( async () => {
        await sequelize.close()
    })

    it("should create a product", async () => {
        const response = await request(app)
            .post("/clients")
            .send({
                name: "teste",
                email: "teste@teste.com.br",
                document: "123",
                city: "testCity",
                street: "testStreet",
                number: "testNumber",
                complement: "testComplement",
                state: "testState",
                zipCode: "testZipCode",
            })

        expect(response.status).toBe(201)
        expect(response.body.id).toBeDefined()
        expect(response.body.name).toBe("teste")
        expect(response.body.email).toBe("teste@teste.com.br")
        expect(response.body.document).toBe("123")
        expect(response.body.city).toBe("testCity")
        expect(response.body.street).toBe("testStreet")
        expect(response.body.number).toBe("testNumber")
        expect(response.body.complement).toBe("testComplement")
        expect(response.body.state).toBe("testState")
        expect(response.body.zipCode).toBe("testZipCode")
        expect(response.body.createdAt).toBeDefined()
        expect(response.body.updatedAt).toBeDefined()
    })
})