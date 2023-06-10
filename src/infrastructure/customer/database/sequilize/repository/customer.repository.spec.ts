import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../model/customer.model";
import CustomerRepository from "./customer.repository";
import { Address } from "../../../../../domain/cutomer/value-object/address";
import { Customer } from "../../../../../domain/cutomer/entity/customer";

describe('Customer repository test', () => {

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
  })

  afterEach(async () => {
    await sequelize.close();
  })


  it('should create a customer', async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address('Rua 1', 123, '12345678', 'Cidade X');
    const customer = new Customer('1', 'Customer 1');
    customer.Address = address
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } });

    expect(customerModel?.toJSON()).toStrictEqual({
      active: false,
      city: "Cidade X",
      id: "1",
      name: "Customer 1",
      number: 123,
      rewardPoints: 0,
      street: "Rua 1",
      zipcode: "12345678",
    })
  })

  it('should update a customer', async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address('Rua 1', 123, '12345678', 'Cidade X');
    const customer = new Customer('1', 'Customer 1');
    customer.Address = address
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } });

    expect(customerModel?.toJSON()).toStrictEqual({
      active: false,
      city: "Cidade X",
      id: "1",
      name: "Customer 1",
      number: 123,
      rewardPoints: 0,
      street: "Rua 1",
      zipcode: "12345678",
    })

    customer.changeName('Customer 2');

    await customerRepository.update(customer);

    const customerModel2 = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerModel2?.toJSON()).toStrictEqual({
      active: false,
      city: "Cidade X",
      id: "1",
      name: "Customer 2",
      number: 123,
      rewardPoints: 0,
      street: "Rua 1",
      zipcode: "12345678",
    });
  })

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address('Rua 1', 123, '12345678', 'Cidade X');
    const customer = new Customer('1', 'Customer 1');
    customer.Address = address
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } });

    const foundCustomer = await customerRepository.findById('1');

    expect(customerModel?.toJSON()).toStrictEqual({
      active: foundCustomer.isActive(),
      city: foundCustomer.address.city,
      id: foundCustomer.id,
      name: foundCustomer.name,
      number: foundCustomer.address.number,
      rewardPoints: foundCustomer.rewardPoints,
      street: foundCustomer.address.street,
      zipcode: foundCustomer.address.zip,
    })
  })

  it('should find all customers', async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address('Rua 1', 123, '12345678', 'Cidade X');
    const customer = new Customer('1', 'Customer 1');
    customer.Address = address
    await customerRepository.create(customer);

    const address2 = new Address('Rua 2', 321, '87654321', 'Cidade Y');
    const customer2 = new Customer('2', 'Customer 2');
    customer2.Address = address2
    await customerRepository.create(customer2);

    const foundCustomers = await customerRepository.findAll();
    const customers = [customer, customer2]

    expect(customers).toEqual(foundCustomers)
  })

})

