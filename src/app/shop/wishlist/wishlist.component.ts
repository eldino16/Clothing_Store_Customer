import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  wishlistItems: Product[] = [];
  url = environment.BASE_IMAGE_PATH;

  constructor(private _wishlistService: WishlistService, private _cartService: CartService, public _productService: ProductService) {

  }

  ngOnInit(): void {
    this._wishlistService.getItems().subscribe(res => {
      this.wishlistItems = res;
    })
  }

  removeItem(item: Product) {
    this._wishlistService.removeFromWishlist(item);
  }

  addToCart(product: Product, qty: number = 1) {
    this._cartService.addToCart(product, qty);
    this.removeItem(product);
  }

}
