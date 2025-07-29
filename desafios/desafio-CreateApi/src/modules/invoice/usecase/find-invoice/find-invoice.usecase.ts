import InvoiceGateway from "../../gateway/invoice.gateway";
import {FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO} from "./find-invoice.usecase.dto";
import Address from "../../../@shared/domain/value-object/address";
import InvoiceItem from "../../domain/invoice-item.entity";


export default class FindInvoiceUseCase {

    private  _invoiceRepository: InvoiceGateway

    constructor(invoiceRepository: InvoiceGateway) {
        this._invoiceRepository = invoiceRepository
    }

    async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
       const result = await this._invoiceRepository.find(input.id)

        return {
            id: result.id.id,
            name: result.name,
            document: result.document,
            street:   result.street,
            number:    result.number,
            complement:    result.complement,
            city:    result.city,
            state:    result.state,
            zipCode:    result.zipCode,
            items: result.items.map(item => ({
                id: item.id.id,
                name: item.name,
                price: item.price,
            })),
            total : result.total(),
            createdAt: result.createdAt,
            updatedAt: result.updatedAt
        }
    }
}