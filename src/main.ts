import { Address } from "./entity/address";
import { Customer } from "./entity/customer";
import { Order } from "./entity/order";
import { OrderItem } from "./entity/order-item";

let customer = new Customer("123", "Kayky Freitas");
const address = new Address("Rua X", 10, "1234-10", "São Paulo");
customer.Address = address;
customer.activate();

let item1 = new OrderItem("1", "Item 1", 10);
let item2 = new OrderItem("2", "Item 2", 20);
let order = new Order("321", "123", [item1, item2]);