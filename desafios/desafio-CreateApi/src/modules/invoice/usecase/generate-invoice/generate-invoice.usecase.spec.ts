import GenerateInvoiceUseCase from "./generate-invoice.usecase";


const MockRepository= () => {
    return {
        generate: jest.fn(),
        find: jest.fn()
    }
}


describe("Generate Invoice use case unit test", () => {

    it("should generate an invoice", async () => {

        const repository = MockRepository()
        const usecase = new GenerateInvoiceUseCase(repository)

        const input = {
            name: "test",
            document: "1",
            street: "testStreet",
            number: "123",
            complement: "testComplement",
            city: "testCity",
            state: "testState",
            zipCode: "testZipCode",
            items: [{
                id : "1",
                name: "test1",
                price: 15
            },{
                id: "2",
                name : "test2",
                price: 20
            }
            ]
        }

        const result = await usecase.execute(input)

        expect(repository.generate).toHaveBeenCalled()
        expect(result.id).toBeDefined()
        expect(result.name).toEqual("test")
        expect(result.document).toEqual("1")
        expect(result.street).toEqual("testStreet")
        expect(result.number).toEqual("123")
        expect(result.complement).toEqual("testComplement")
        expect(result.city).toEqual("testCity")
        expect(result.state).toEqual("testState")
        expect(result.zipCode).toEqual("testZipCode")
        expect(result.items.length).toEqual(2)
        expect(result.items[0].id).toBeDefined()
        expect(result.items[0].name).toEqual("test1")
        expect(result.items[0].price).toEqual(15)
        expect(result.items[1].id).toBeDefined()
        expect(result.items[1].name).toEqual("test2")
        expect(result.items[1].price).toEqual(20)
    })
})