import UpdateProductUseCase from "./update.product.usecase"

const input = {
  id: '123 UPDATED',
  name: 'Notebook 256gb UPDATED',
  price: 10000.50
}

const mockRepository = () => {
  return {
    findById: jest.fn().mockReturnValue(Promise.resolve(input)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit test update product use case', () => {

  it('should update a product', async () => {
    const productRepository = mockRepository();
    const useCase = new UpdateProductUseCase(productRepository);

    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: '123 UPDATED',
      name: 'Notebook 256gb UPDATED',
      price: 10000.50
    })
  })

})