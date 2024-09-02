import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {

  testimonial = [{
    image: '../../assets/images/noimage.png',
    name: 'Manuel Fredrick',
    designation: 'Designer',
    description: 'you know how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.',
  }, {
    image: '../../assets/images/noimage.png',
    name: 'Manuel Fredrick',
    designation: 'Content Writer',
    description: 'you know how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.',
  }, {
    image: '../../assets/images/noimage.png',
    name: 'Christian Viera',
    designation: 'Lead Developer',
    description: 'you know how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.',
  },
  {
    image: '../../assets/images/noimage.png',
    name: 'Brad Peter',
    designation: 'Content Writer',
    description: 'you know how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.',
  },
  {
    image: '../../assets/images/noimage.png',
    name: 'Paola Caprio',
    designation: 'Lead Developer',
    description: 'you know how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.',
  },
  {
    image: '../../assets/images/noimage.png',
    name: 'John Hendrick',
    designation: 'Lead Developer',
    description: 'you know how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.',
  },];


  // Teastimonial Slick slider config
  testimonialSliderConfig = {
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  // Team 
  team = [{
    image: '../../assets/images/noimage.png',
    name: 'Mark Johnson',
    designation: 'CEO & Founder at Company'
  }, {
    image: '../../assets/images/noimage.png',
    name: 'Wayne Mason',
    designation: 'CEO & Founder at Company'
  }, {
    image: '../../assets/images/noimage.png',
    name: 'Manuel Fredrick',
    designation: 'Designer & Content Writer'
  }, {
    image: '../../assets/images/noimage.png',
    name: 'Christian Viera',
    designation: 'Lead Developer'
  },
  {
    image: '../../assets/images/noimage.png',
    name: 'Brad Peter',
    designation: 'Designer & Content Writer'
  },
  {
    image: '../../assets/images/noimage.png',
    name: 'Paola Caprio',
    designation: 'Lead Developer'
  },
  {
    image: '../../assets/images/noimage.png',
    name: 'John Hendrick',
    designation: 'Lead Developer'
  }];

  // Team Slick slider config
  teamSliderConfig = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 586,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

}
