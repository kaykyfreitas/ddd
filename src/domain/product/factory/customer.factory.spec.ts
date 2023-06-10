import ProductFactory from "./customer.factory";

describe("Product factory unit test", () => {

  it("should be create a product", () => {
    const product = ProductFactory.create("Product","Product A", 1);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product A");
    expect(product.price).toBe(1);
    expect(product.constructor.name).toBe("Product")
  })

  it("should throw an error when type is not supported", () => {
    expect(() => ProductFactory.create("Prooduct2", "Product C", 1)).toThrow(
      "Product type not supported"
    )
  })

})