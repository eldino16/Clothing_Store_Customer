import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
  logos: any[] = [];
  url = environment.BASE_IMAGE_PATH;
  constructor(private _httpService: HttpService) {

  }

  ngOnInit(): void {
    this._httpService.get(environment.BASE_API_PATH + "Brandlogo/GetAll").subscribe(res => {
      this.logos = res.data;
    })
  }

  sliderConfig = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 3000
  };

}