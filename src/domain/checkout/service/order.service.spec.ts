
import { Customer } from "../../cutomer/entity/customer";
import { Order } from "../entity/order";
import { OrderItem } from "../entity/order-item";
import OrderService from "./order.service";

describe('Order service unit tests', () => {

  it('should place an order', () => {

    const customer = new Customer('c1', 'Customer 1')
    const item1 = new OrderItem('i1', 'Item1', 10, 'p1', 1);

    const order = OrderService.placeOrder(customer, [ item1 ]);

    expect(customer.rewardPoints).toBe(5)
    expect(order.total()).toBe(10);

  })

  it('should get total off all order', () => {
    
    const orderItem1 = new OrderItem('Item 1', 'Item 1', 100, 'p1', 1);
    const orderItem2 = new OrderItem('Item 2', 'Item 2', 200, 'p2', 2);

    const order1 = new Order('O1', 'C1', [ orderItem1 ]);
    const order2 = new Order('O2', 'C2', [ orderItem2 ]);

    const total = OrderService.total([order1, order2]);

    expect(total).toBe(500)

  });

})