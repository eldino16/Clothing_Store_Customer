import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {
  @Input('colors') colors: any[] = [];
  activeColor: any = "";
  @Output() colorFilter: EventEmitter<any[]> = new EventEmitter<any[]>();
  constructor() { }

  ngOnInit(): void {
    $('#colorToggleId').on('click', function (e) {
      e.preventDefault();
      $(this).next("#colorToggle").slideToggle();
    })
  }

  selectColor(cl: any) {
    this.activeColor = cl.color;
    if (cl.color) {
      this.colorFilter.emit([cl]);
    } else {
      this.colorFilter.emit([]);
    }
  }

}
