import Order from "../../../../domain/checkout/entity/order";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItem from "../../../../domain/checkout/entity/order_item";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        try {
            await OrderModel.create(
                {
                    id: entity.id,
                    customer_id: entity.customerId,
                    total: entity.total(),
                    items: entity.items.map((item) => ({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        product_id: item.productId,
                        quantity: item.quantity,
                    })),
                },
                {
                    include: [{model: OrderItemModel}],
                }
            );
        } catch(error) {
            //throw new Error("Failed to create order");
            throw error;
        }
    }

    async find(id: string): Promise<Order> {
        try {
            const order = await OrderModel.findOne({
                where: {id},
                include: ["items"]
            })
            return new Order(id, order.customer_id, order.items.map(item => {
                return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
            }))
        } catch (error) {
            throw new Error("Error finding order with id " + id);
        }
    }

    async findAll(): Promise<Order[]> {
        try {
            const orders = await OrderModel.findAll({
                include: ["items"]
            })
            return orders.map(order => {
                return new Order(order.id,order.customer_id,order.items.map(item =>{
                    return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
                }))
            })
        }catch(error) {
            throw new Error("Failed to find orders");
        }
    }

    async update(entity: Order): Promise<void> {
        try {
            for (const item of entity.items) {
                if (await OrderItemModel.findOne({where: {id: item.id}})) {
                    await OrderItemModel.update({
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        productId: item.productId,
                    }, {
                        where: {id: item.id}
                    })
                }
            }

            await OrderModel.update({
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    productId: item.productId,
                }))
            }, {where: {id: entity.id}})
        } catch (error) {
            throw new Error("Error while updating order");
        }
    }
}
