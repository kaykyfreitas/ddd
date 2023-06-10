import { Sequelize } from "sequelize-typescript";
import OrderModel from "../model/order.model";
import CustomerModel from "../../../../customer/database/sequilize/model/customer.model";
import OrderItemModel from "../model/order-item.model";
import ProductModel from "../../../../product/database/sequelize/model/product.model";
import CustomerRepository from "../../../../customer/database/sequilize/repository/customer.repository";
import { Customer } from "../../../../../domain/cutomer/entity/customer";
import { Address } from "../../../../../domain/cutomer/value-object/address";
import ProductRepository from "../../../../product/database/sequelize/repository/product.repository";
import Product from "../../../../../domain/product/entity/product";
import { OrderItem } from "../../../../../domain/checkout/entity/order-item";
import { Order } from "../../../../../domain/checkout/entity/order";
import OrderRepository from "./order.repository";

describe('Order repository test', () => {

  let sequelize: Sequelize;

  beforeEach(async () => {

    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true}
    });

    sequelize.addModels([OrderModel, CustomerModel, OrderItemModel, ProductModel]);
    await sequelize.sync();
  })

  afterEach(async () => {
    await sequelize.close();
  })

  it('should create a new order', async () => {

    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 10);
    await productRepository.create(product);

    const orderItem = new OrderItem('1', product.name, product.price, product.id, 2);
    const order = new Order('123', '1', [orderItem])

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({ 
      where: { id: order.id },
      include: ['items']
    })

    expect(orderModel?.toJSON()).toStrictEqual({
      id: '123',
      customer_id: '1',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: '123',
          product_id: '1'
        }
      ]
    })

  })

  it('should find a order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 10);
    await productRepository.create(product);

    const orderItem = new OrderItem('1', product.name, product.price, product.id, 2);
    const order = new Order('123', '1', [orderItem])

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({ 
      where: { id: order.id },
      include: ['items']
    })

    const foundOrder = await orderRepository.findById('123');

    expect(orderModel?.toJSON()).toEqual({
      id: foundOrder.id,
      customer_id: foundOrder.customerId,
      items: [
        {
          id: foundOrder.items.at(0)?.id,
          name: foundOrder.items.at(0)?.name,
          order_id: foundOrder.id,
          price: foundOrder.items.at(0)?.price,
          product_id: foundOrder.items.at(0)?.productId,
          quantity: foundOrder.items.at(0)?.quantity
        }
      ],
      total: foundOrder.total()
    })
  })

  it('should find all products', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);
    await productRepository.create(product);

    const product2 = new Product('2', 'Product 2', 200);
    await productRepository.create(product2);

    const foundProducts = await productRepository.findAll();
    const products = [product, product2]

    expect(products).toEqual(foundProducts)
  })

})

