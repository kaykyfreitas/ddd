import Product from "../entity/product";
import ProductInterface from "../entity/product.interface";
import { v4 as uuid } from "uuid";

export default class ProductFactory {

  public static create(type: string, name: string, price: number): ProductInterface {
    switch (type) {
      case "Product":
        return new Product(uuid(), name, price);
      default:
        throw new Error("Product type not supported");
    }
  }

}