import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/database/sequelize/model/product.model";
import ProductRepository from "../../../infrastructure/product/database/sequelize/repository/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import Product from "../../../domain/product/entity/product";

describe('Integration tests for update product use case', () => {

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


  it('should update a product', async () => {
    const productRepository = new ProductRepository();
    const useCase = new UpdateProductUseCase(productRepository);

    const product = new Product('123', 'Iphone', 1500.00)
    productRepository.create(product);
    
    const input = {
      id: '123',
      name: 'Iphone X',
      price: 1500.50
    }

    const result = await useCase.execute(input);

    expect(result).toEqual(input);
  })

});