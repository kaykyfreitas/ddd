import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/database/sequelize/model/product.model";
import CreateProductUseCase from "./create.product.usecase";
import ProductRepository from "../../../infrastructure/product/database/sequelize/repository/product.repository";

describe('Integration tests for create product use case', () => {

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


  it('should create a product', async () => {
    const productRepository = new ProductRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const input = {
      name: 'Iphone',
      price: 1500.00
    }

    const result = await useCase.execute(input);

    expect(result.id).toBeDefined();
    expect(result.name).toEqual('Iphone');
    expect(result.price).toEqual(1500.00);
  })

});