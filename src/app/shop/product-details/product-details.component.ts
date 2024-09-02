import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productDetails: Product;
  url = environment.BASE_IMAGE_PATH;
  number = 1;
  selectedSize = '';

  constructor(public _productService: ProductService, private _route: ActivatedRoute, private _router: Router, private _cartService: CartService, private _wishlistService: WishlistService) {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._productService.getProductById(parseInt(id)).subscribe(res => this.productDetails = res);
    })

  }

  ngOnInit(): void {

  }

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
  };

  slideNavConfig = {
    vertical: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.product-slick',
    arrows: false,
    dots: false,
    focusOnSelect: true
  }

  changeSize(size: string) {
    this.selectedSize = size;
  }

  increment() {
    this.number += 1;
  }

  decrement() {
    if (this.number > 1) {
      this.number -= 1;
    }
  }

  addToCart() {
    this._cartService.addToCart(this.productDetails, this.number);
  }

  addToWishlist() {
    this._wishlistService.addToWishlist(this.productDetails);
  }

  buyNow() {
    if (this.number > 0) {
      let isExists = this._cartService.hasProduct(this.productDetails);
      if (!isExists) {
        this._cartService.addToCart(this.productDetails, this.number);
      }
      this._router.navigate(['/home/checkout']);
    }
  }


}
