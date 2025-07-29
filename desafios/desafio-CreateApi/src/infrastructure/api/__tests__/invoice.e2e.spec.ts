import {app, sequelize} from "../express";
import request from "supertest";

describe("E2E test for invoice", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true})
    })

    afterAll(async () => {
        await sequelize.close()
    })


    it("E2E test for invoice",async () => {
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

        const responseInvoice = await request(app)
            .get("/invoice/"+responseCheckout.body.invoiceId)
            .send()

        expect(responseInvoice.status).toBe(201)
        expect(responseInvoice.body.id).toBeDefined()
        expect(responseInvoice.body.name).toBe(responseClient.body.name)
        expect(responseInvoice.body.document).toBe(responseClient.body.document)
        expect(responseInvoice.body.street).toBe(responseClient.body.street)
        expect(responseInvoice.body.number).toBe(responseClient.body.number)
        expect(responseInvoice.body.complement).toBe(responseClient.body.complement)
        expect(responseInvoice.body.city).toBe(responseClient.body.city)
        expect(responseInvoice.body.state).toBe(responseClient.body.state)
        expect(responseInvoice.body.zipCode).toBe(responseClient.body.zipCode)
        expect(responseInvoice.body.items[0].id).toBeDefined()
        expect(responseInvoice.body.items[0].name).toBe(responseProduct.body.name)
        expect(responseInvoice.body.items[0].price).toBe(responseProduct.body.purchasePrice)
        expect(responseInvoice.body.total).toBe(150)
        expect(responseInvoice.body.createdAt).toBeDefined()
        expect(responseInvoice.body.updatedAt).toBeDefined()
    })
})