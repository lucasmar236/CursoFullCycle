import InvoiceGateway from "../../gateway/invoice.gateway";
import {GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto} from "./generate-invoice.usecase.dto";
import Invoice from "../../domain/invoice.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../../@shared/domain/value-object/address";
import InvoiceItem from "../../domain/invoice-item.entity";


export default class GenerateInvoiceUseCase {

    private _invoiceRepository: InvoiceGateway;

    constructor(invoiceRepository: InvoiceGateway) {
        this._invoiceRepository = invoiceRepository;
    }

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {

        const invoice = new Invoice({
            id: new Id(input.id) || new Id(),
            name: input.name,
            document: input.document,
            address: new Address(
                input.street,
                input.number,
                input.complement,
                input.city,
                input.state,
                input.zipCode,
            ),
            items: input.items.map(item => new InvoiceItem({
                id: new Id(input.id),
                name: item.name,
                price: item.price,
            })),
        });

        await this._invoiceRepository.generate(invoice)
        return {
            id : invoice.id.id,
            name : invoice.name,
            document : invoice.document,
            street : invoice.street,
            number: invoice.number,
            complement: invoice.complement,
            city: invoice.city,
            state: invoice.state,
            zipCode: invoice.zipCode,
            items: invoice.items.map(item => ({
                id : item.id.id,
                name: item.name,
                price: item.price
            })),
            total : invoice.total()
        }
    }
}