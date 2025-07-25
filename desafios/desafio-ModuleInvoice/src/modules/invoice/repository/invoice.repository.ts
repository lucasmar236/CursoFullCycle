import InvoiceGateway from "../gateway/invoice.gateway";
import Invoice from "../domain/invoice.entity";
import InvoiceModel from "./invoice.model";
import InvoiceItemModel from "./invoice-item.model";
import Address from "../../@shared/domain/value-object/address";
import InvoiceItem from "../domain/invoice-item.entity";
import Id from "../../@shared/domain/value-object/id.value-object";


export default class InvoiceRepository implements InvoiceGateway {
    async generate(input: Invoice): Promise<void> {
       await  InvoiceModel.create({
           id: input.id.id,
           name: input.name,
           document: input.document,
           street: input.address.street,
           number: input.address.number,
           complement: input.address.complement,
           city: input.address.city,
           state: input.address.state,
           zipcode: input.address.zipCode,
           createdAt: input.createdAt,
           updatedAt: input.updatedAt,
           items: input.items.map((item) => ({
               id: item.id.id,
               name: item.name,
               price: item.price,
           })),
       },{ include: [ {model :InvoiceItemModel}] })

    }
    async find(id: string): Promise<Invoice> {
        const invoice = await InvoiceModel.findOne(
            {where: {id}, include: ["items"]})

        if (!invoice) {
            throw new Error("Invoice not found")
        }

        return new Invoice({
            id: new Id(invoice.id),
            name: invoice.name,
            document: invoice.document,
            address: new Address(
                invoice.street,
                invoice.number,
                invoice.complement,
                invoice.city,
                invoice.state,
                invoice.zipcode,
            ),
            items: invoice.items.map(item => new InvoiceItem({
                id: new Id(item.id),
                name: item.name,
                price: item.price,
            })),
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
        })
    }
}