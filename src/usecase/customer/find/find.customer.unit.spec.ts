import { Customer } from "../../../domain/cutomer/entity/customer";
import { Address } from "../../../domain/cutomer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer('123', 'John Doe');
const address = new Address('Street X', 123, '12345678', 'City X');
customer.changeAddress(address);

const mockRepository = () => {
  return {
    findById: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit est find customer use case', () => {

  it('should find a customer', async () => {

    const customerRepository = mockRepository();
    const useCase = new FindCustomerUseCase(customerRepository);

    await customerRepository.create(customer);

    const input = {
      id: '123',
    };

    const output = {
      id: '123',
      name: 'John Doe',
      address: {
        street: 'Street X',
        city: 'City X',
        number: 123,
        zip: '12345678'
      },
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(output);

  });

  it('should not find a customer', async () => {

    const customerRepository = mockRepository();
    customerRepository.findById.mockImplementation(() => {
      throw new Error('Customer not found');
    })

    const useCase = new FindCustomerUseCase(customerRepository);

    await customerRepository.create(customer);

    const input = {
      id: '123',
    };

    expect(() => {
      return useCase.execute(input)
    }).rejects.toThrow('Customer not found');
  });

});
