import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  currency: string = "INR";

  constructor(private _httpClient: HttpClient) { }

  private allProducts(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(environment.BASE_API_PATH + 'ProductMaster/GetProductList');
  }

  getProducts(): Observable<Product[]> {
    return this.allProducts();
  }

  getProductById(id: number): Observable<Product> {
    return this.allProducts().pipe(map(p => p.find(p => p.id == id)));
  }

  getProductByCateogory(category: string): Observable<Product[]> {
    return this.allProducts().pipe(map(p => p.filter((pro: Product) => {
      if (category === 'all') {
        return true;
      }
      return pro.category == category;
    })));
  }
}
