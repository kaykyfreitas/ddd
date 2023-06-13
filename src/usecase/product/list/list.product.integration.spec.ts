import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/database/sequelize/model/product.model";
import ProductRepository from "../../../infrastructure/product/database/sequelize/repository/product.repository";
import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

describe('Integration tests for list product use case', () => {

  let sequelize: Sequelize;

  beforeEach(async () => {

    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true}
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  })

  afterEach(async () => {
    await sequelize.close();
  })


  it('should list product', async () => {
    const productRepository = new ProductRepository();
    const useCase = new ListProductUseCase(productRepository);

    const product1 = new Product('123', 'Iphone', 1500.00)
    productRepository.create(product1);

    const product2 = new Product('321', 'Samsung', 1000.00)
    productRepository.create(product2);

    const output1 = {
      id: '123',
      name: 'Iphone',
      price: 1500.00
    }

    const output2 = {
      id: '321',
      name: 'Samsung',
      price: 1000.00
    }

    const output = { products: [ output1, output2 ] }

    const result = await useCase.execute({});

    expect(result).toEqual(output);
  })

});