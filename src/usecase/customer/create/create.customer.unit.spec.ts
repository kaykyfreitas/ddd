import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
  name: 'John Doe',
  address: {
    street: 'Street X',
    city: 'City X',
    number: 123,
    zip: '12345678'
  },
}

const mockRepository = () => {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit test create customer use case', () => {

  it('should create a customer', async () => {
    const customerRepository = mockRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        city: input.address.city,
        number: input.address.number,
        zip: input.address.zip
      },
    });
  });

  it('should throw an error when name is missing', async () => {
    const customerRepository = mockRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    input.name = '';

    await expect(useCase.execute(input)).rejects.toThrow("customer: name is required")
  });

  it('should throw an error when street is missing', async () => {
    const customerRepository = mockRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    input.address.street = '';

    await expect(useCase.execute(input)).rejects.toThrow("Street is required")
  });

});