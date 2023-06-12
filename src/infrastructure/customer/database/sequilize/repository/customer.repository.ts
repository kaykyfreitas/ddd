import { Customer } from "../../../../../domain/cutomer/entity/customer";
import CustomerRepositoryInterface from "../../../../../domain/cutomer/repository/customer-repository-interface";
import { Address } from "../../../../../domain/cutomer/value-object/address";
import CustomerModel from "../model/customer.model";



export default class CustomerRepository implements CustomerRepositoryInterface {

  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zipcode: entity.address.zip,
      city: entity.address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints
    })
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        zipcode: entity.address.zip,
        city: entity.address.city,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints
      },
      {
        where: {
          id: entity.id
        },
      }
    )
  }

  async findById(id: string): Promise<Customer> {
    const customerModel = await CustomerModel.findOne({ where: { id } });

    if (customerModel == null) {
      throw new Error("Customer not found");
    }
    const address = new Address(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city)
    const customer =  new Customer(customerModel.id, customerModel.name);
    customer.Address = address;
    if (customerModel.active) {
      customer.activate();
    }

    customer.addRewardPoints(customerModel.rewardPoints);
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();
    return customerModels.map(customerModel => {
      const customer = new Customer(customerModel.id, customerModel.name);
      const address = new Address(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city)
      customer.changeAddress(address);
      if (customerModel.active) {
        customer.activate();
      }
      customer.addRewardPoints(customerModel.rewardPoints);
      return customer;
    });
  }
  
}