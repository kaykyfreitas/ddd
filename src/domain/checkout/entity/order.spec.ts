import { Order } from "./order"
import { OrderItem } from "./order-item";

describe('Order unity tests', () => {

  it('Should throw error when id is empty', () => {
    expect(() => {
      let order = new Order('', '123', []);
    }).toThrowError('Id is required');
  })

  it('Should throw error when customer id is empty', () => {
    expect(() => {
      let order = new Order('123', '', []);
    }).toThrowError('Customer id is required');
  })

  it('Should throw error when items are empty', () => {
    expect(() => {
      let order = new Order('123', '123', []);
    }).toThrowError('Items are required');
  })

  it('Should calculate total', () => {
    const item1 = new OrderItem('I1', 'I1', 100, "p1", 2);
    const item2 = new OrderItem('I2', 'I2', 200, "p2", 2);
    const order1 = new Order('O1', 'C1', [item1])
    const order2 = new Order('O2', 'C2', [item1, item2])

    let total = order1.total();

    expect(total).toBe(200);

    total = order2.total();

    expect(total).toBe(600);
  })

  it('should throw error if the item quantity is less or equal zero', () => {
    expect(() => {
      const item1 = new OrderItem('I1', 'I1', 100, "p1", 0);
      const order1 = new Order('O1', 'C1', [item1])
    }).toThrowError("Quantity must be greater than zero")
  })

})