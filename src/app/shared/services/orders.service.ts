import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private orderDetails: Order;

  constructor(private _router: Router) { }

  setOrderDetails(obj: Order) {
    this.orderDetails = obj;
    this._router.navigate(['/home/checkout/success']);
  }

  getOrderDetails(): Order {
    return this.orderDetails;
  }
}
