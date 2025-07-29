import express, { Request, Response } from "express";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import InvoiceRepository from "../repository/invoice.repository";


export const invoiceRoute = express.Router();

invoiceRoute.get("/:id", async (req: Request, res: Response) => {
    const usecase = new FindInvoiceUseCase(new InvoiceRepository())
    try {
        const input = {
            id : req.params.id,
        }
        const result = await usecase.execute(input)
        res.status(201).json(result)
    }catch (e) {
        res.status(500).json(e)
    }
})