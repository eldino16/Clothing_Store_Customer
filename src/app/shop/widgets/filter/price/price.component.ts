import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventManager } from '@angular/platform-browser';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {
  @Output() priceFilter: EventEmitter<any[]> = new EventEmitter<any[]>();
  constructor() {

  }

  ngOnInit(): void {
    $('#priceToggleId').on('click', function (e) {
      e.preventDefault();
      $(this).next("#priceToggle").slideToggle();
    })
  }

  minValue: number = 100;
  maxValue: number = 2000;
  options: Options = {
    floor: 0,
    ceil: 2000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<b>Min price:</b> ₹" + value;
        case LabelType.High:
          return "<b>Max price:</b> ₹" + value;
        default:
          return "₹" + value;
      }
    }
  };

  selectPrice(event: any) {
    let price = [];
    price.push(event.value);
    price.push(event.highValue);
    this.priceFilter.emit(price);
  }

}
