import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface,
{
    FindInvoiceFacadeInputDto,
    FindInvoiceFacadeOutputDto,
    GenerateInvoiceFacadeInputDto,
} from "./invoice.facade.interface";
import Address from "../../@shared/domain/value-object/address";
import {string} from "yup";
import InvoiceItem from "../domain/invoice-item.entity";




export interface UseCaseProps {
    generateUseCase: UseCaseInterface;
    findUserFacade: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
    private _generateUseCase: UseCaseInterface;
    private _findUserFacade: UseCaseInterface;

    constructor(usecaseProps: UseCaseProps) {
        this._generateUseCase = usecaseProps.generateUseCase;
        this._findUserFacade = usecaseProps.findUserFacade;
    }

    async find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
        return await this._findUserFacade.execute(input);
    }

    async generate(input: GenerateInvoiceFacadeInputDto): Promise<void> {
         await this._generateUseCase.execute(input);

    }

}