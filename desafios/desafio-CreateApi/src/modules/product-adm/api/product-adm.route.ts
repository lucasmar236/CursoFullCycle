import express, { Request, Response } from "express";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import ProductRepository from "../repository/product.repository";



export const productAdmRoute = express.Router();


productAdmRoute.post("/", async (req: Request, res: Response) => {
    const usecase = new AddProductUseCase(new ProductRepository())
    try {
        const input = {
            name: req.body.name,
            description: req.body.description,
            purchasePrice: req.body.purchasePrice,
            stock: req.body.stock,
        }
        const result = await usecase.execute(input)
        res.status(201).json(result)
    }catch (e) {
        res.status(500).json(e)
    }
})
