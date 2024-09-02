import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { CartItem } from '../interfaces/cart-items.interface';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  products: any[] = JSON.parse(localStorage.getItem('cartItem')) || [];
  cartItems: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);

  constructor(private _toastrService: ToastrService) { }

  getItems(): Observable<CartItem[]> {
    return of(this.products);
  }

  getTotalAmount(): Observable<number> {
    return this.cartItems.pipe(map(() => {
      return this.products.reduce((total: number, item: CartItem) => {
        return total + (item.product.price * item.quantity);
      }, 0)
    }));
  }

  addToCart(product: Product, qty: number = 1) {
    let hasItem = this.products.find((item: CartItem, index: number) => {
      if (item.product.id === product.id) {
        let Qty = item.quantity + qty;
        let isStock = this.calculateItemStock(item.product, Qty);
        if (Qty != 0 && isStock) {
          this.products[index].quantity = Qty;
          localStorage.setItem('cartItem', JSON.stringify(this.products));
        }
        return true;
      }
      return false;
    });

    if (!hasItem) {
      let item: CartItem = {
        product: product,
        quantity: qty
      };
      this.products.push(item);
      localStorage.setItem('cartItem', JSON.stringify(this.products));
      this._toastrService.success('Item has been added to the cart', 'Cart');
    }
  }

  updateCart(product: Product, qty: number = 1) {
    this.products.find((item: CartItem, index: number) => {
      if (item.product.id === product.id) {
        let Qty = item.quantity + qty;
        let isStock = this.calculateItemStock(item.product, Qty);
        if (Qty != 0 && isStock) {
          this.products[index].quantity = Qty;
          localStorage.setItem('cartItem', JSON.stringify(this.products));
        }
      }
    });
  }

  removeFromCart(item: CartItem) {
    let index = this.products.indexOf(item);
    if (index > -1) {
      this.products.splice(index, 1);
      localStorage.setItem('cartItem', JSON.stringify(this.products));
    }
  }

  clearCart() {
    this.products.splice(0, this.products.length);
    localStorage.setItem('cartItem', JSON.stringify(this.products));
  }

  calculateItemStock(item: Product, qty: number): boolean {
    let stock = item.stock;
    if (stock < qty) {
      this._toastrService.error('Quantity out of stock! Please reduce quantity.', 'Cart');
      return false;
    }
    return true;
  }

  hasProduct(product: Product): boolean {
    let item = this.products.find((item: CartItem) => item.product.id === product.id);
    return item !== undefined;
  }

}
