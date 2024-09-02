import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { CompareService } from 'src/app/shared/services/compare.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {

  compareItems: Product[] = [];
  url = environment.BASE_IMAGE_PATH;

  constructor(private _compareService: CompareService, private _cartService: CartService, public _productService: ProductService) {

  }

  ngOnInit(): void {
    this._compareService.getItems().subscribe(res => {
      this.compareItems = res;
    })
  }

  removeItem(item: Product) {
    this._compareService.removeFromComparelist(item);
  }

  addToCart(product: Product, qty: number = 1) {
    this._cartService.addToCart(product, qty);
  }

}
