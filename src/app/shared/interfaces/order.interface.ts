import { CartItem } from "./cart-items.interface";

export interface Order {
    product: CartItem[],
    shippingDetails: any,
    orderId: string,
    totalAmount: number,
    expectedDate: any,
    paymentDate: any
}