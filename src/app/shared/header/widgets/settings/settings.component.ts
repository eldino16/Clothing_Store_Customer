import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { CartItem } from 'src/app/shared/interfaces/cart-items.interface';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  cartItems: CartItem[] = [];
  url = environment.BASE_IMAGE_PATH;

  constructor(private _translate: TranslateService, private _cartService: CartService, public _productService: ProductService) { }

  ngOnInit(): void {
    this._cartService.getItems().subscribe(res => this.cartItems = res)
  }

  changeLanguage(language: string) {
    this._translate.use(language);
  }

  removeItem(item: CartItem) {
    this._cartService.removeFromCart(item);
  }

  getTotalAmount(): Observable<number> {
    return this._cartService.getTotalAmount();
  }



}
