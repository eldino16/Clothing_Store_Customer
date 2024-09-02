import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {

  sliderConfig = {
    autoPlay: true,
    autoPlaySpeed: 3000
  }

}
