import Invoice from "../../domain/invoice.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../../@shared/domain/value-object/address";
import InvoiceItem from "../../domain/invoice-item.entity";
import FindInvoiceUseCase from "./find-invoice.usecase";


const invoice = new Invoice({
    id : new Id("1"),
    name: "test",
    document: "1",
    address : new Address(
        "testStreet",
        "123",
        "testComplement",
        "testCity",
        "testState",
        "testZipCode"
    ),
    items: [
        new InvoiceItem({
            id: new Id("1"),
            name: "test1",
            price: 15,
        })
    ]
})

const MockRepository = () => {
    return {
        generate : jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    };
};

describe("Find Invoice use case unit test", () => {
    it("should find a invoice", async () => {
        const repository = MockRepository()
        const usecase = new FindInvoiceUseCase(repository)

        const input = {
            id : "1"
        }

        const result = await usecase.execute(input)

        expect(repository.find).toHaveBeenCalled()
        expect(result.id).toEqual(invoice.id.id)
        expect(result.name).toEqual(invoice.name)
        expect(result.document).toEqual(invoice.document)
        expect(result.street).toEqual(invoice.street)
        expect(result.number).toEqual(invoice.number)
        expect(result.complement).toEqual(invoice.complement)
        expect(result.city).toEqual(invoice.city)
        expect(result.state).toEqual(invoice.state)
        expect(result.zipCode).toEqual(invoice.zipCode)
        expect(result.items.length).toEqual(1)
        expect(result.items[0].id).toEqual(invoice.items[0].id.id)
        expect(result.items[0].name).toEqual(invoice.items[0].name)
        expect(result.items[0].price).toEqual(invoice.items[0].price)
        expect(result.total).toEqual(invoice.total())
        expect(result.createdAt).toStrictEqual(invoice.createdAt)
        expect(result.updatedAt).toStrictEqual(invoice.updatedAt)
    })
})