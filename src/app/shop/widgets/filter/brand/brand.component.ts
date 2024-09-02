import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  @Input() brands: any[] = [];
  @Output() brandFilter: EventEmitter<any[]> = new EventEmitter<any[]>();
  Brands: any[] = [];
  constructor() { }

  ngOnInit(): void {
    $('#brandToggleId').on('click', function (e) {
      e.preventDefault();
      $(this).next("#brandToggle").slideToggle();
    })
  }

  selectedBrands(event: any) {
    if (event.target.checked) {
      this.Brands.push(event.target.value);
    } else {
      let index = this.Brands.indexOf(event.target.value);
      this.Brands.splice(index, 1);
    }
    this.brandFilter.emit(this.Brands);
  }
}
