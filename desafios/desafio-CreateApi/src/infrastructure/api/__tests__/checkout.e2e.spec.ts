import {app, sequelize} from "../express";
import request from "supertest";


describe("E2E test for checkout", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true})
    })

    afterAll(async () => {
        await sequelize.close()
    })


    it("E2E test for checkout",async () => {
        const responseClient = await request(app)
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
        expect(responseClient.status).toBe(201)
        expect(responseClient.body.id).toBeDefined()


        const responseProduct = await request(app)
            .post("/products")
            .send({
                name: "teste",
                description: "teste",
                purchasePrice: 150,
                stock: 10
            })
        expect(responseProduct.status).toBe(201)
        expect(responseProduct.body.id).toBeDefined()

        const responseCheckout = await request(app)
            .post("/checkout")
            .send({
                clientId: responseClient.body.id,
                products: [{
                    productId: responseProduct.body.id,
                }]
            })

        expect(responseCheckout.status).toBe(201)
        expect(responseCheckout.body.id).toBeDefined()
        expect(responseCheckout.body.invoiceId).toBeDefined()
        expect(responseCheckout.body.status).toBe("approved")
        expect(responseCheckout.body.total).toBe(150)
        expect(responseCheckout.body.products[0].id).toBe(responseProduct.body.id)
        expect(responseCheckout.body.products[0].name).toBe(responseProduct.body.name)
        expect(responseCheckout.body.products[0].price).toBe(responseProduct.body.purchasePrice)
    })
})