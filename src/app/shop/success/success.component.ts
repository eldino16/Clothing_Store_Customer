import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/interfaces/order.interface';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  orderDetails: Order;
  url = environment.BASE_IMAGE_PATH;

  constructor(private _orderService: OrdersService, public _productService: ProductService) {

  }

  ngOnInit(): void {
    this.orderDetails = this._orderService.getOrderDetails();
    console.log(this.orderDetails);
  }

}
