import { Sequelize } from "sequelize-typescript";
import { Address } from "../../domain/entity/address";
import { Customer } from "../../domain/entity/customer";
import { Order } from "../../domain/entity/order";
import { OrderItem } from "../../domain/entity/order-item";
import Product from "../../domain/entity/product";
import CustomerModel from "../database/sequelize/model/customer.model";
import OrderItemModel from "../database/sequelize/model/order-item.model";
import OrderModel from "../database/sequelize/model/order.model";
import ProductModel from "../database/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import OrderRepository from "./order.repository";
import ProductRepository from "./product.repository";

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

  // it('should update a product', async () => {
  //   const productRepository = new ProductRepository();
  //   const product = new Product('1', 'Product 1', 100);
  //   await productRepository.create(product);

  //   const productModel = await ProductModel.findOne({ where: { id: '1' } });

  //   expect(productModel?.toJSON()).toStrictEqual({
  //     id: '1',
  //     name: 'Product 1',
  //     price: 100
  //   });

  //   product.changeName('Product 2');
  //   product.changePrice(200);

  //   await productRepository.update(product);

  //   const productModel2 = await ProductModel.findOne({ where: { id: "1" } });

  //   expect(productModel2?.toJSON()).toStrictEqual({
  //     id: "1",
  //     name: "Product 2",
  //     price: 200
  //   });
  // })

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

