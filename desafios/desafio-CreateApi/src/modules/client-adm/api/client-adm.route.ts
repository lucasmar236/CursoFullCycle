import express, { Request, Response } from "express";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import ClientRepository from "../repository/client.repository";


export const clientAdmRoute = express.Router();


clientAdmRoute.post("/",async (req: Request, res: Response) => {
    const usecase = new AddClientUseCase(new ClientRepository())
    try {
        const input = {
            name: req.body.name,
            email: req.body.email,
            document: req.body.document,
            city: req.body.city,
            street: req.body.street,
            number: req.body.number,
            complement: req.body.complement,
            state: req.body.state,
            zipCode: req.body.zipCode,
        }
        const output = await usecase.execute(input)
        res.status(201).json(output)
    }catch (e) {
        res.status(500).json(e)
    }
})