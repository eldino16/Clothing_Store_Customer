import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import { CompareService } from 'src/app/shared/services/compare.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  url = environment.BASE_IMAGE_PATH;
  variantImage: string;

  constructor(public _productService: ProductService, private _router: Router, private _cartService: CartService, private _wishlistService: WishlistService, private _compareService: CompareService) { }

  ngOnInit(): void {
    this.variantImage = this.product.variants.length > 0 ? this.product.variants[0].images : '';
  }

  addToCart(product: Product) {
    this._cartService.addToCart(product);
  }

  addToWishlist(product: Product) {
    this._wishlistService.addToWishlist(product);
  }

  viewDetails(product: Product) {
    this._router.navigate(['']);
  }

  addToComparelist(product: Product) {
    this._compareService.addToComparelist(product);
  }

  changeVariant(img: string) {
    this.variantImage = img;
  }
}
