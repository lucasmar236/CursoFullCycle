import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";

export const productRoute = express.Router();

productRoute.post('/',async (req: Request, res : Response) => {
    const usecase = new CreateProductUseCase(new ProductRepository());
    try{
        const productDto = {
            name: req.body.name,
            price: req.body.price,
            type: req.body.type,
        }
        const product = await usecase.execute(productDto);
        res.status(201).send(product);
    }catch (e) {
        res.status(500).send(e);
    }
})


productRoute.get('/', async (req: Request, res : Response) => {
    const usecase = new ListProductUseCase(new ProductRepository());
    try{
        const products = await usecase.execute({});
        res.status(200).send(products);
    }catch (e) {
        res.status(500).send(e);
    }
})