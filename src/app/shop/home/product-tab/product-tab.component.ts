import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product.interface';
import * as $ from 'jquery';
@Component({
  selector: 'app-product-tab',
  templateUrl: './product-tab.component.html',
  styleUrls: ['./product-tab.component.scss']
})
export class ProductTabComponent implements OnInit {
  @Input('products') products: Product[];
  constructor() { }

  ngOnInit(): void {
    $("#tab-1").show();

    $(".tabs li a").on('click', function (e) {
      e.preventDefault();
      $(this).parent().parent().find('li').removeClass('current');
      $(this).parent().addClass('current');


      let currentHref = $(this).attr('href');
      $(this).parent().parent().parent().find('.tab-content').hide();
      $("#" + currentHref).show();
    });
  }
}