import express, { Request, Response } from "express";
import CheckoutUseCaseFactory from "../factory/checkout.usecase.factory";

export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
    const usecase = CheckoutUseCaseFactory.create()
    try {
        const input = {
            clientId: req.body.clientId,
            products: req.body.products,
        }
        const result = await usecase.execute(input)
        res.status(201).json(result)
    }catch (e) {
        console.log(e)
        res.status(500).json(e)
    }
})