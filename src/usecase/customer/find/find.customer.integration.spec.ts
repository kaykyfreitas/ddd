import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/database/sequilize/model/customer.model";
import CustomerRepository from "../../../infrastructure/customer/database/sequilize/repository/customer.repository";
import { Customer } from "../../../domain/cutomer/entity/customer";
import { Address } from "../../../domain/cutomer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

describe('Test find customer use case', () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true}
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should find a customer', async () => {

    const customerRepository = new CustomerRepository();
    const useCase = new FindCustomerUseCase(customerRepository);

    const customer = new Customer('123', 'John Doe');
    const address = new Address('Street X', 123, '12345678', 'City X');
    customer.changeAddress(address);
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

});
