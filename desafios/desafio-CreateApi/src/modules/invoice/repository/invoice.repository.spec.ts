import {Sequelize} from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import InvoiceItemModel from "./invoice-item.model";
import Invoice from "../domain/invoice.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../../@shared/domain/value-object/address";
import InvoiceItem from "../domain/invoice-item.entity";
import InvoiceRepository from "./invoice.repository";


describe('Invoice repository test', () => {

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

    it("should generate an invoice", async () => {
        const invoice = new Invoice({
            id: new Id("1"),
            name: "test",
            document: "1",
            address: new Address(
                "testStreet",
                "123",
                "testComplement",
                "testCity",
                "testState",
                "testZipcode",
            ),
            createdAt: new Date(),
            updatedAt: new Date(),
            items: [new InvoiceItem({
                id: new Id("1"),
                name: "test1",
                price: 15,
            }),
                new InvoiceItem({
                id: new Id("2"),
                name: "test2",
                price: 20})],
        })

        const repository = new InvoiceRepository()
        await repository.generate(invoice)

        const invoiceDb = await InvoiceModel.findOne({where: {id: "1"}})

        expect(invoiceDb).toBeDefined()
        expect(invoiceDb.id).toEqual(invoice.id.id)
        expect(invoiceDb.name).toEqual(invoice.name)
        expect(invoiceDb.document).toEqual(invoice.document)
        expect(invoiceDb.street).toEqual(invoice.street)
        expect(invoiceDb.number).toEqual(invoice.number)
        expect(invoiceDb.complement).toEqual(invoice.complement)
        expect(invoiceDb.city).toEqual(invoice.city)
        expect(invoiceDb.state).toEqual(invoice.state)
        expect(invoiceDb.zipcode).toEqual(invoice.zipCode)
        expect(invoiceDb.createdAt).toStrictEqual(invoice.createdAt)
        expect(invoiceDb.updatedAt).toStrictEqual(invoice.updatedAt)
    })

    it("should find an invoice", async () => {

        const invoice = await InvoiceModel.create({
            id: "1",
            name: "test",
            document: "1",
            street: "testStreet",
            number: "testNumber",
            complement: "testComplement",
            city: "testCity",
            state: "testState",
            zipcode: "testZipcode",
            createdAt: new Date(),
            updatedAt: new Date(),
            items: [{
                id: "1",
                name: "test1",
                price: 15,
            },
            {
                id: "2",
                name: "test2",
                price: 20,
            }
            ],
        },{ include: [ {model :InvoiceItemModel}] })

        const repository = new InvoiceRepository()
        const result = await repository.find(invoice.id)

        expect(result).toBeDefined()
        expect(result.id.id).toEqual(invoice.id)
        expect(result.name).toEqual(invoice.name)
        expect(result.document).toEqual(invoice.document)
        expect(result.street).toEqual(invoice.street)
        expect(result.number).toEqual(invoice.number)
        expect(result.complement).toEqual(invoice.complement)
        expect(result.city).toEqual(invoice.city)
        expect(result.state).toEqual(invoice.state)
        expect(result.zipCode).toEqual(invoice.zipcode)
        expect(result.createdAt).toStrictEqual(invoice.createdAt)
        expect(result.updatedAt).toStrictEqual(invoice.updatedAt)
        expect(result.items.length).toEqual(2)
        expect(result.items[0].id.id).toEqual("1")
        expect(result.items[0].name).toEqual("test1")
        expect(result.items[0].price).toEqual(15)
        expect(result.items[1].id.id).toEqual("2")
        expect(result.items[1].name).toEqual("test2")
        expect(result.items[1].price).toEqual(20)
    })
})