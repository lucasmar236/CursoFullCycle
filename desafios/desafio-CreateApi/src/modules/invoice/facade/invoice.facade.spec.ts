import {Sequelize} from "sequelize-typescript";
import InvoiceModel from "../repository/invoice.model";
import InvoiceItemModel from "../repository/invoice-item.model";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";



describe("Invoice Facade test", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        })

        sequelize.addModels([InvoiceModel,InvoiceItemModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should be able to create a new invoice", async () => {
        const facade = InvoiceFacadeFactory.create()

        const input = {
            id : "1",
            name: "test",
            document: "1",
            street:    "testStreet",
            number:    "123",
            complement:    "testComplement",
             city:   "testCity",
             state:   "testState",
             zipCode:   "testZipCode",
            items: [
                {
                    id: "1",
                    name: "test1",
                    price: 15,
                }
            ]
        }

        await facade.generate(input)

        const invoice = await  InvoiceModel.findOne({where: {id : "1"}, include: ["items"]})

        expect(invoice).toBeDefined()
        expect(invoice.id).toEqual(input.id)
        expect(invoice.name).toEqual(input.name)
        expect(invoice.document).toEqual(input.document)
        expect(invoice.street).toEqual(input.street)
        expect(invoice.number).toEqual(input.number)
        expect(invoice.complement).toEqual(input.complement)
        expect(invoice.city).toEqual(input.city)
        expect(invoice.state).toEqual(input.state)
        expect(invoice.zipcode).toEqual(input.zipCode)
        expect(invoice.items[0].id).toEqual(input.items[0].id)
        expect(invoice.items[0].name).toEqual(input.items[0].name)
        expect(invoice.items[0].price).toEqual(input.items[0].price)
    });

    it("should be able to find an invoice", async () => {

        const facade = InvoiceFacadeFactory.create()

        const input = {
            id : "1",
            name: "test",
            document: "1",
            street:    "testStreet",
            number:    "123",
            complement:    "testComplement",
            city:   "testCity",
            state:   "testState",
            zipCode:   "testZipCode",
            items: [
                {
                    id: "1",
                    name: "test1",
                    price: 15,
                }
            ]
        }

        await facade.generate(input)

        const invoice = await facade.find({id : "1"})
        expect(invoice).toBeDefined()
        expect(invoice.id).toEqual(input.id)
        expect(invoice.name).toEqual(input.name)
        expect(invoice.document).toEqual(input.document)
        expect(invoice.street).toEqual(input.street)
        expect(invoice.number).toEqual(input.number)
        expect(invoice.complement).toEqual(input.complement)
        expect(invoice.city).toEqual(input.city)
        expect(invoice.state).toEqual(input.state)
        expect(invoice.zipCode).toEqual(input.zipCode)
        expect(invoice.items[0].id).toEqual(input.items[0].id)
        expect(invoice.items[0].name).toEqual(input.items[0].name)
        expect(invoice.items[0].price).toEqual(input.items[0].price)

    })
})