import { Customer } from "../../../domain/cutomer/entity/customer";
import { Address } from "../../../domain/cutomer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = new Customer('123', 'John Doe');
const address = new Address('Street X', 123, '12345678', 'City X');
customer.changeAddress(address);

const input = {
  id: customer.id,
  name: 'John Doe UPDATED',
  address: {
    street: 'Street X UPDATED',
    number: 321,
    zip: '87654321',
    city: 'City X UPDATED'
  }
}

const mockRepository = () => {
  return {
    findById: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit test for customer update use case', () => {

  it('should update a customer', async () => {
    const customerRepository = mockRepository();
    const useCase = new UpdateCustomerUseCase(customerRepository);

    const output = await useCase.execute(input);

    expect(output).toEqual(input);
  })

});
