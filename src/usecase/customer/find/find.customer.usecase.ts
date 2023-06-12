import CustomerRepositoryInterface from "../../../domain/cutomer/repository/customer-repository-interface";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./find.customer.dto";

export default class FindCustomerUseCase {

  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
    const customer = await this.customerRepository.findById(input.id);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        city: customer.address.city,
        number: customer.address.number,
        zip: customer.address.zip
      },
    };
  }

}