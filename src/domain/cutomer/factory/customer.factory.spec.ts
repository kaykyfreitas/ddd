import { Address } from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {

  it("should create a new customer", () => {
    const customer = CustomerFactory.create("customer", "John");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.address).toBeUndefined();
  })

  it("should create a new customer with address", () => {
    const address = new Address('Street 1', 123, '01234567', 'São Paulo');
    const customer = CustomerFactory.createWithAddress("customer", "John", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.address).toBe(address);
  })

})