import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                type: "a",
                price: 100,
                name:"product 1"
            });

        expect(response.status).toBe(201);
        expect(response.body.price).toBe(100);
        expect(response.body.name).toBe("product 1");
    })



    it("should list all product", async () => {
        const response = await request(app).post("/products").send({
            type: "a",
            price: 100,
            name:"product 1"
        })
        expect(response.status).toBe(201);
        const response2 = await request(app).post("/products").send({
            type: "b",
            price: 100,
            name:"product 2"
        })
        expect(response2.status).toBe(201);

        const listResponse = await request(app).get("/products").send();

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);
        const product = listResponse.body.products[0];
        expect(product.name).toBe("product 1");
        expect(product.price).toBe(100);
        const product2 = listResponse.body.products[1];
        expect(product2.name).toBe("product 2");
        expect(product2.price).toBe(200);
    });
});
