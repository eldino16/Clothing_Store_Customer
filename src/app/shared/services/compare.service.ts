import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../interfaces/product.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompareService {

  products: any[] = JSON.parse(localStorage.getItem('compareItem')) || [];

  constructor(private _toastrService: ToastrService) { }

  getItems(): Observable<Product[]> {
    return of(this.products);
  }

  hasProduct(product: Product): boolean {
    let item = this.products.find((item: Product) => item.id === product.id)
    return item !== undefined;
  }

  addToComparelist(product: Product) {
    if (!this.hasProduct(product)) {
      if (this.products.length != 4) {
        this.products.push(product);
        localStorage.setItem('compareItem', JSON.stringify(this.products));
        this._toastrService.success('Item has been added to the compare list', 'Compare');
      }
      else {
        this._toastrService.warning('Maximum 4 items can be compared.', 'Compare');
      }

    }
    else {
      this._toastrService.warning('This item already exists in the compare list', 'Compare');
    }
  }

  removeFromComparelist(item: Product) {
    let index = this.products.indexOf(item);
    if (index > -1) {
      this.products.splice(index, 1);
      localStorage.setItem('compareItem', JSON.stringify(this.products));
    }
  }
}
