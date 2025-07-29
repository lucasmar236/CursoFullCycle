import {app,sequelize} from "../express";
import request from "supertest";


describe("E2E test for product", () => {
    beforeEach( async () => {
        await sequelize.sync({force: true})
    })

    afterAll( async () => {
        await sequelize.close()
    })

    it("should create a product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "teste",
                description: "teste",
                purchasePrice: 10,
                stock: 10
            })

        expect(response.status).toBe(201)
        expect(response.body.id).toBeDefined()
        expect(response.body.name).toBe("teste")
        expect(response.body.description).toBe("teste")
        expect(response.body.purchasePrice).toBe(10)
        expect(response.body.stock).toBe(10)
        expect(response.body.createdAt).toBeDefined()
        expect(response.body.updatedAt).toBeDefined()
    })
})