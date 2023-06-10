import { Address } from "../../entity/address";
import { Customer } from "../../entity/customer";
import EventDispatcher from "../@shared/event-dispatcher";
import CustomerAddressUpdatedEvent from "./customer-address-updated.event";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLogHandler from "./handler/envia-console-log.handler";
import EnviaConsoleLog1Handler from "./handler/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "./handler/envia-console-log2.handler";

describe("Created customer event", () => {

  it("should execute handlers when customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new EnviaConsoleLog1Handler();
    const eventHandler2 = new EnviaConsoleLog2Handler();
    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

    const customerCreatedEvent = new CustomerCreatedEvent({
      name: "Customer 1",
      active: true,
      rewardPoints: 5
    });

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  })

  it("should execute handlers when customer address is updated", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerAddressUpdatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["CustomerAddressUpdatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerAddressUpdatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["CustomerAddressUpdatedEvent"][0]).toMatchObject(eventHandler);

    const customer = new Customer('123', 'John Doe');
    const address = new Address('Street 1', 123, '01234567', 'São Paulo');
    customer.Address = address;

    const updatedAddress = new Address('Street 123', 321, '07654321', 'São Paulo');
    customer.changeAddress(updatedAddress);

    const customerAddressUpdatedEvent = new CustomerAddressUpdatedEvent(customer)

    eventDispatcher.notify(customerAddressUpdatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  })

})