import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerChangeAddressEvent from "../customer-change-address.event";


export default class EnviaConsoleLogHandler implements EventHandlerInterface<CustomerChangeAddressEvent>{
    handle(data: CustomerChangeAddressEvent) {
        console.log(`Endereço do cliente ${data.eventData.id}, ${data.eventData.name} foi alterado para:
        ${data.eventData.Address.street}, ${data.eventData.Address.number}, ${data.eventData.Address.zip}, ${data.eventData.Address.city}`);
    }
}