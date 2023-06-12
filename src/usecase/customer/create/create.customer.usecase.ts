import { v4 as uuid } from "uuid";
import CustomerRepositoryInterface from "../../../domain/cutomer/repository/customer-repository-interface";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";
import CustomerFactory from "../../../domain/cutomer/factory/customer.factory";
import { Address } from "../../../domain/cutomer/value-object/address";

export default class CreateCustomerUseCase {
  
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
    const customer = CustomerFactory.createWithAddress("customer", input.name, new Address(
      input.address.street,
      input.address.number,
      input.address.zip,
      input.address.city
    ));

    await this.customerRepository.create(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        zip: customer.address.zip,
        city: customer.address.city,
      },
    };
  }

}