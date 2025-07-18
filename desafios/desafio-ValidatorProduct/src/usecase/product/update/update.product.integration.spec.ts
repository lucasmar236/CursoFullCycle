import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
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

    it ("should update a product", async () => {
        const productRepository = new ProductRepository();
        const useCase = new UpdateProductUseCase(productRepository);

        const product = ProductFactory.create("a", "name", 100);
        await productRepository.create(product);

        const input = {
            id: product.id,
            name: "new name",
            price: 200,
        };

        const result = await useCase.execute(input);

        const output = {
            id: product.id,
            name: "new name",
            price: 200,
        }

        expect(result).toEqual(output);
    })
});