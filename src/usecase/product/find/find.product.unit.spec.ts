import FindProductUseCase from "./find.product.usecase"

const input = {
  id: '123'
}

const output = {
  id: '123',
  name: 'Notebook 256gb',
  price: 4199.99
}

const mockRepository = () => {
  return {
    findById: jest.fn().mockReturnValue(Promise.resolve(output)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit test find product use case', () => {

  it('should find a product', async () => {
    const productRepository = mockRepository();
    const useCase = new FindProductUseCase(productRepository);

    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: '123',
      name: 'Notebook 256gb',
      price: 4199.99
    })
  })

})