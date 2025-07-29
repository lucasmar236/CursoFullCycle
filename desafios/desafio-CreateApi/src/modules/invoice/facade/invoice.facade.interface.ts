import Address from "../../@shared/domain/value-object/address";
import InvoiceItem from "../domain/invoice-item.entity";


export interface FindInvoiceFacadeInputDto {
    id: string;
}

export interface FindInvoiceFacadeOutputDto {
    id: string
    name: string
    document: string
    street: string
    number: string
    complement: string
    city: string
    state: string
    zipCode: string
    items: {
        id: string
        name: string
        price: number
    }[]
    createdAt: Date
    updatedAt: Date
}

export interface GenerateInvoiceFacadeInputDto{
    id?: string
    name: string
    document: string
    street: string
    number: string
    complement: string
    city: string
    state: string
    zipCode: string
    items: {
        id: string
        name: string
        price: number
    }[]
}

export interface GenerateInvoiceFacadeOutputDto{
    id: string
}




export default interface InvoiceFacadeInterface{
    generate(input:GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto>;
    find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto>;
}