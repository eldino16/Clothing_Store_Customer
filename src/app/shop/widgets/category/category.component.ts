import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  ngOnInit(): void {
    $("#categoryToggleId").on('click', function (e) {
      e.preventDefault();
      $(this).next("#categoryToggle").slideToggle();
    })
  }

}
