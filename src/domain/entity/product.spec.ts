import Product from "./product";

describe("Product unit testes", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product 1", 100);
    }).toThrowError("Id is required");
  })

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("123", "", 100);
    }).toThrowError("Name is required");
  })

  it("should throw error when price is less than zero", () => {
    expect(() => {
      const product = new Product("123", "Product 1", -1);
    }).toThrowError("Price must be greater than zero");
  })

  it("should change name", () => {
    expect(() => {
      const product = new Product("123", "Product 1", 10);
      product.changeName("Product 2")
      expect(product.name).toBe("Product 2")
    });
  })

  it("should change price", () => {
    expect(() => {
      const product = new Product("123", "Product 1", 10);
      product.changePrice(20)
      expect(product.price).toBe(20)
    });
  })

})