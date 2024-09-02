import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { CartItem } from 'src/app/shared/interfaces/cart-items.interface';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  shoppingCartItems: CartItem[] = [];
  url = environment.BASE_IMAGE_PATH;

  constructor(private _cartService: CartService, public _productService: ProductService) {

  }

  ngOnInit(): void {
    this._cartService.getItems().subscribe(res => {
      this.shoppingCartItems = res;
    })
  }

  increment(product: Product, qty: number = 1) {
    this._cartService.updateCart(product, qty);
  }

  decrement(product: Product, qty: number = -1) {
    this._cartService.updateCart(product, qty);
  }

  removeItem(item: CartItem) {
    this._cartService.removeFromCart(item);
  }

  getTotalAmount(): Observable<number> {
    return this._cartService.getTotalAmount();
  }

}
