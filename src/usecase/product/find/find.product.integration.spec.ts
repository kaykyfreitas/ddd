import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/database/sequelize/model/product.model";
import ProductRepository from "../../../infrastructure/product/database/sequelize/repository/product.repository";
import FindProductUseCase from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";

describe('Integration tests for find product use case', () => {

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


  it('should find a product', async () => {
    const productRepository = new ProductRepository();
    const useCase = new FindProductUseCase(productRepository);

    const product = new Product('123', 'Iphone', 1500.00)
    productRepository.create(product);

    const input = {
      id: '123'
    }

    const output = {
      id: '123',
      name: 'Iphone',
      price: 1500.00
    }

    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  })

});