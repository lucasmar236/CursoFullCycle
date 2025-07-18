import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";

describe("Test find product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should list all products", async () => {
        const productRepository = new ProductRepository();
        const useCase = new ListProductUseCase(productRepository);

        const product1 = ProductFactory.create("a", "product 1", 100);
        const product2 = ProductFactory.create("b", "product 2", 200);
        await productRepository.create(product1);
        await productRepository.create(product2);

        const result = await useCase.execute({});

        const output = {
            products: [
                {
                    id: product1.id,
                    name: "product 1",
                    price: 100,
                },
                {
                    id: product2.id,
                    name: "product 2",
                    price: 400,
                }
            ]
        }

        expect(result).toEqual(output);
    })
});