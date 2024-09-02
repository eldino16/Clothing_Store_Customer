import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  products: Product[] = [];
  allItems: Product[] = [];
  items: Product[] = [];
  isMen: boolean = false;
  finished: boolean = false;

  brands: any[] = [];
  colors: any[] = [];

  brandFilters: any[] = [];
  colorFilters: any[] = [];

  constructor(private _productService: ProductService, private _route: ActivatedRoute) {
    this._route.params.subscribe(params => {
      let category = params['category'];
      if (category === 'Men') {
        this.isMen = true;
      }
      else {
        this.isMen = false;
      }
      this._productService.getProductByCateogory(category).subscribe(res => {
        this.allItems = res;
        this.products = res.splice(0, 8);
        this.items = this.products;

        this.getBrands(res);
        this.getColors(res);
      })
    })

  }

  ngOnInit(): void {

  }

  getBrands(products: Product[]) {
    let uniqueBrands = [];
    let brandItems = [];

    products.map((product: Product) => {
      if (product.tags) {
        product.tags.map((tag) => {
          let index = uniqueBrands.indexOf(tag);
          if (index === -1) {
            uniqueBrands.push(tag);
          }
        })
      }
    });

    for (let i = 0; i < uniqueBrands.length; i++) {
      brandItems.push({ brand: uniqueBrands[i] });
    }

    this.brands = brandItems;
  }

  getColors(products: Product[]) {
    let uniqueColors = [];
    let colorItems = [];

    products.map((product: Product) => {
      if (product.colors) {
        product.colors.map((color) => {
          let index = uniqueColors.indexOf(color);
          if (index === -1) {
            uniqueColors.push(color);
          }
        })
      }
    });

    for (let i = 0; i < uniqueColors.length; i++) {
      colorItems.push({ color: uniqueColors[i] });
    }

    this.colors = colorItems;
  }

  updateBrandFilter(brands: any) {
    this.brandFilters = brands;
  }

  updateColorFilter(colors: any) {
    this.colorFilters = colors;
  }

  updatePriceFilter(price: any) {
    let filterItems: any[] = [];
    this.products.filter((product: Product) => {
      if (product.price >= price[0] && product.price <= price[1]) {
        filterItems.push(product);
      }
    });
    this.items = filterItems;
  }

  filterItems(): Product[] {
    let itemData = this.items.filter((item: Product) => {
      let Colors: boolean = this.colorFilters.reduce((prev, curr) => {
        if (item.colors) {
          if (item.colors.includes(curr.color)) {
            return true;
          } else {
            return false;
          }
        }
        return true;
      }, true);

      let Brands: boolean = this.brandFilters.reduce((prev, curr) => {
        if (item.tags) {
          if (item.tags.includes(curr)) {
            return true;
          } else {
            return false;
          }
        }
        return true;
      }, true);
      return Colors && Brands;
    });

    return itemData;
  }

  onScroll() {
    let lastKey = this.allItems[this.allItems.length - 1]['id'];
    let currentKey = this.products[this.products.length - 1]['id'];
    if (lastKey != currentKey) {
      this.finished = false;
    }
    else {
      this.finished = true;
    }

    let len = this.products.length + 4;
    if (this.products.length < this.allItems.length) {
      for (let i = this.products.length; i < len; i++) {
        if (this.allItems[i] == undefined) {
          return true;
        } else {
          this.products.push(this.allItems[i]);
        }
      }
    }
    return true;
  }

  changeLayout(colSize: number) {
    if (colSize === 2) {
      $(".product-wrapper-grid").children().children().children().removeClass();
      $(".product-wrapper-grid").children().children().children().addClass("col-xl-6 col-grid-box");
    } else if (colSize === 3) {
      $(".product-wrapper-grid").children().children().children().removeClass();
      $(".product-wrapper-grid").children().children().children().addClass("col-xl-4 col-grid-box");
    } else if (colSize === 4) {
      $(".product-wrapper-grid").children().children().children().removeClass();
      $(".product-wrapper-grid").children().children().children().addClass("col-xl-3 col-grid-box");
    }
    else {
      $(".product-wrapper-grid").children().children().children().removeClass();
      $(".product-wrapper-grid").children().children().children().addClass("col-xl-2 col-grid-box");
    }
  }

}