import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import EventDispatcher from "../../@shared/event/event-dispatcher";
import EnviaConsoleLog1Handler from "./handler/EnviaConsoleLog1Handler";
import EnviaConsoleLog2andler from "./handler/EnviaConsoleLog2Handler";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../entity/customer";
import Address from "../value-object/address";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLogHandler from "./handler/EnviaConsoleLogHandler";
import CustomerChangeAddressEvent from "./customer-change-address.event";

describe("Domain events tests", () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should register customer created event handler",() => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new EnviaConsoleLog1Handler();

      eventDispatcher.register("CustomerCreatedEvent", eventHandler);

      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);

      const eventHandler2 = new EnviaConsoleLog2andler();
      eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);
    })

    it("should unregister all event handler",() => {
        const eventDispatcher = new EventDispatcher();
        const event1Handler = new EnviaConsoleLog1Handler();
        const event2Handler = new EnviaConsoleLog2andler();

        eventDispatcher.register("CustomerCreatedEvent", event1Handler);
        eventDispatcher.register("CustomerCreatedEvent", event2Handler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(event1Handler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(event2Handler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined();
    })


    it("should notify custom created event handler", async () => {
        const eventDispatcher = new EventDispatcher();
        const event1Handler = new EnviaConsoleLog1Handler();
        const event2Handler = new EnviaConsoleLog2andler();

        const spy1EventHandler = jest.spyOn(event1Handler, "handle");
        const spy2EventHandler = jest.spyOn(event2Handler, "handle");

        eventDispatcher.register("CustomerCreatedEvent", event1Handler);
        eventDispatcher.register("CustomerCreatedEvent", event2Handler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(event1Handler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(event2Handler);

        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        customer.Address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.addRewardPoints(10);
        customer.activate();

        await customerRepository.create(customer);

        const customerCreatedEvent = new CustomerCreatedEvent(customer);


        eventDispatcher.notify(customerCreatedEvent);

        expect(spy1EventHandler).toHaveBeenCalled();
        expect(spy2EventHandler).toHaveBeenCalled();
    })

    it("should notify customer change address event handlers", async () => {
        const eventDispatcher = new EventDispatcher();
        const event1Handler = new EnviaConsoleLog1Handler();
        const eventChangeAddressHandler = new EnviaConsoleLogHandler();

        const spyEventHandler = jest.spyOn(event1Handler, "handle");
        const spyEventChangeAddressHandler = jest.spyOn(eventChangeAddressHandler, "handle");

        eventDispatcher.register("CustomerCreatedEvent", event1Handler);
        eventDispatcher.register("CustomerChangeAddressEvent", eventChangeAddressHandler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(event1Handler);
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]).toMatchObject(eventChangeAddressHandler);

        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        customer.Address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.addRewardPoints(10);
        customer.activate();

        await customerRepository.create(customer);
        const customerCreatedEvent = new CustomerCreatedEvent(customer);
        eventDispatcher.notify(customerCreatedEvent);

        const address2 = new Address("Street ", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address2)

        const customerChangeAddressEvent = new CustomerChangeAddressEvent(customer);

        eventDispatcher.notify(customerChangeAddressEvent);

        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventChangeAddressHandler).toHaveBeenCalled();
    })
})