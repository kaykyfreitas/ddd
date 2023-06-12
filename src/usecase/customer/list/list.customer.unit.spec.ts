import { Customer } from "../../../domain/cutomer/entity/customer";
import { Address } from "../../../domain/cutomer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = new Customer('123', 'John Doe');
const address1 = new Address('Street X', 123, '12345678', 'City X');
customer1.changeAddress(address1);

const customer2 = new Customer('321', 'Peter Parker');
const address2 = new Address('Street Y', 321, '87654321', 'City Y');
customer2.changeAddress(address2);

const mockRepository = () => {
  return {
    findById: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit test for listing customer use case', () => {

  it('should list customers', async () => {
    const customerRepository = mockRepository();
    const useCase = new ListCustomerUseCase(customerRepository);

    const output = await useCase.execute({});

    expect(output.customers.length).toBe(2);
    expect(output.customers[0].id).toBe(customer1.id);
    expect(output.customers[0].name).toBe(customer1.name);
    expect(output.customers[0].address.street).toBe(customer1.address.street);
    expect(output.customers[1].id).toBe(customer2.id);
    expect(output.customers[1].name).toBe(customer2.name);
    expect(output.customers[1].address.street).toBe(customer2.address.street);
  })

})