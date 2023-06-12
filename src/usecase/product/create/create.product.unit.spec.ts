import CreateProductUseCase from "./create.product.usecase"

const input = {
  name: 'Notebook 256gb',
  price: 4199.99
}

const mockRepository = () => {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit test create product use case', () => {

  it('should create a product', async () => {
    const productRepository = mockRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: 'Notebook 256gb',
      price: 4199.99
    })
  })

})