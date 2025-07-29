import ProductGateway from "../../store-catalog/gateway/product.gateway";
import orderEntity from "../domain/order.entity";
import CheckoutGateway from "../gateway/checkout.gateway";


export default class CheckoutRepository implements CheckoutGateway {
    addOrder(order: orderEntity): Promise<void> {
       return null
    }
    findOder(id: string): Promise<orderEntity> {
        throw new Error("Method not implemented.");
    }

}