import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class EnviaConsoleLog2andler implements EventHandlerInterface<CustomerCreatedEvent>{
    handle(data: CustomerCreatedEvent) {
        console.log('Esse é o segundo console.log do evento: CustomerCreated');
    }
}