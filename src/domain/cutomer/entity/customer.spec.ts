
import { Address } from "../value-object/address";
import { Customer } from "./customer";

describe('Customer unity tests', () => {

  it('Should throw error when id is empty', () => {
    expect(() => {
      let customer = new Customer('', 'John Doe');
    }).toThrowError('Id is required');
  });
  
  it('Should throw error when name is empty', () => {
    expect(() => {
      let customer = new Customer('123', '');
    }).toThrowError('Name is required');
  });

  it('Should change name', () => {
    let customer = new Customer('123', 'John Doe');

    customer.changeName('Peter Parker');

    expect(customer.name).toBe('Peter Parker');
  });

  it('Should activate customer', () => {
    const customer = new Customer('123', 'John Doe');
    const address = new Address('Street 1', 123, '01234567', 'São Paulo');
    customer.Address = address;

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });
  
  it('Should deactivate customer', () => {
    const customer = new Customer('123', 'John Doe');

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it('Should throw error when address is undefined when you activate a customer', () => {

    expect(() => {
      const customer = new Customer('123', 'John Doe');
      customer.activate();
    }).toThrowError('Address is mandatory to activate a customer');
    const customer = new Customer('123', 'John Doe');
  });

  it('should add reward points', () => {
    const customer = new Customer('1', 'Customer 1');

    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);

    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);

    expect(customer.rewardPoints).toBe(20);
  })

})