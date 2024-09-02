import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {

  sliderProducts = [];
  url = environment.BASE_IMAGE_PATH;

  constructor(public _productService: ProductService) {

  }

  ngOnInit(): void {
    this._productService.getProducts().subscribe(res => {
      let data = res;
      while (data.length > 0) {
        this.sliderProducts.push(data.splice(0, 3))
      }
    })
  }

}
