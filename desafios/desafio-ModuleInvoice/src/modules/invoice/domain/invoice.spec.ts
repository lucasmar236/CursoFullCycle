import Invoice from "./invoice.entity";
import InvoiceItem from "./invoice-item.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../../@shared/domain/value-object/address";



describe('Invoice unit tests', () => {
    it("should create invoice",() => {
        let invoice = new Invoice(
            {
                id: new Id("1"),
                name: "test",
                document: "1",
                address: new Address("test","123",
                    "testComplement","testCity",
                    "testState","testZipcode"),
                items: [
                    new InvoiceItem({
                        id: new Id("1"),
                        name: "test1",
                        price: 15.00
                    }),
                    new InvoiceItem({
                        id: new Id("2"),
                        name: "test2",
                        price: 16.50
                    })
                ]
            }
        )

        expect(invoice.validate()).toBe(true)
        expect(invoice.id.id).toEqual("1")
        expect(invoice.name).toEqual("test")
        expect(invoice.document).toEqual("1")
        expect(invoice.address.city).toEqual("testCity")
        expect(invoice.address.complement).toEqual("testComplement")
        expect(invoice.address.number).toEqual("123")
        expect(invoice.address.state).toEqual("testState")
        expect(invoice.address.street).toEqual("test")
        expect(invoice.address.zipCode).toEqual("testZipcode")
        expect(invoice.items.length).toEqual(2)
        expect(invoice.items[0].id.id).toEqual("1")
        expect(invoice.items[0].name).toEqual("test1")
        expect(invoice.items[0].price).toEqual(15)
        expect(invoice.items[1].id.id).toEqual("2")
        expect(invoice.items[1].name).toEqual("test2")
        expect(invoice.items[1].price).toEqual(16.50)
    })
})