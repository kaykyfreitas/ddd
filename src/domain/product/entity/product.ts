import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import ProductValidatorFactory from "../factory/customer.validator.factory";
import ProductInterface from "./product.interface";

export default class Product extends Entity implements ProductInterface {

  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.errors)
    }
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  get price(): number {
    return this._price;
  }

  changePrice(price: number): void {
    this._price = price;
  }

  private validate() {
    ProductValidatorFactory.create().validate(this);
  }
}