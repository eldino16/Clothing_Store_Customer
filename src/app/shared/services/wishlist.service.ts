import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../interfaces/product.interface';
import { Observable, of } from 'rxjs';
import { withEnabledBlockingInitialNavigation } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  products: any[] = JSON.parse(localStorage.getItem('wishlistItem')) || [];

  constructor(private _toastrService: ToastrService) { }

  getItems(): Observable<Product[]> {
    return of(this.products);
  }

  hasProduct(product: Product): boolean {
    let item = this.products.find((item: Product) => item.id === product.id)
    return item !== undefined;
  }

  addToWishlist(product: Product) {
    if (!this.hasProduct(product)) {
      this.products.push(product);
      localStorage.setItem('wishlistItem', JSON.stringify(this.products));
      this._toastrService.success('Item has been added to the wishlist', 'Wishlist');
    }
    else {
      this._toastrService.warning('This item already exists in the wishlist', 'Wishlist');
    }
  }

  removeFromWishlist(item: Product) {
    let index = this.products.indexOf(item);
    if (index > -1) {
      this.products.splice(index, 1);
      localStorage.setItem('wishlistItem', JSON.stringify(this.products));
    }
  }
}
