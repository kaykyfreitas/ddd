
import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import EventInterface from "../../../@shared/event/event.interface";
import CustomerAddressUpdatedEvent from "../customer-address-updated.event";

export default class EnviaConsoleLogHandler implements EventHandlerInterface<CustomerAddressUpdatedEvent> {
  handle(event: EventInterface): void {
    console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address.street}`);
  }
}