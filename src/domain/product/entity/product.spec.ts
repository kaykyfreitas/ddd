import Product from "./product";

describe("Product unit testes", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product 1", 100);
    }).toThrowError("product: id is required");
  })

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("123", "", 100);
    }).toThrowError("product: name is required");
  })

  it("should throw error when id and name are empty", () => {
    expect(() => {
      const product = new Product("", "", 100);
    }).toThrowError("product: id is required, product: name is required");
  })

  it("should throw error when price is less than zero", () => {
    expect(() => {
      const product = new Product("123", "Product 1", -1);
    }).toThrowError("product: price must be greater than zero");
  })

  it("should throw error when id and name are empty and price is less than zero", () => {
    expect(() => {
      const product = new Product("", "", -1);
    }).toThrowError("product: id is required, product: name is required, product: price must be greater than zero");
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