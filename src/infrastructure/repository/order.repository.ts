import { Order } from "../../domain/entity/order";
import { OrderItem } from "../../domain/entity/order-item";
import OrderRepositoryInterface from "../../domain/repository/order-repository-interface";
import OrderItemModel from "../database/sequelize/model/order-item.model";
import OrderModel from "../database/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {

  async create(entity: Order): Promise<void> {
    await OrderModel.create({
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
            order_id: entity.id
        }))
    },
    {
      include: [{ model: OrderItemModel }]
    })
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        items: entity.items,
        total: entity.total(),
      },
      {
        where: {
          id: entity.id
        },
      },
    )
  }

  async findById(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id: id },
      include: [OrderItemModel], 
    });

    if (orderModel == null) {
      throw new Error("Order not found");
    }

    return new Order(orderModel.id, orderModel.customer_id, this.itemsMapper(orderModel.items));
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll();
    return orderModels.map(orderModel => new Order(
        orderModel.id, 
        orderModel.customer_id, 
        this.itemsMapper(orderModel.items)
      )
    );
  }


  private itemsMapper(itemsModel: OrderItemModel[]): OrderItem[] {
    return itemsModel.map(itemModel => new OrderItem(
        itemModel.id, 
        itemModel.name, 
        itemModel.price, 
        itemModel.product_id, 
        itemModel.quantity
      )
    )
  }

}