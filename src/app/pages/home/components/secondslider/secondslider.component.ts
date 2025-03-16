import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-secondslider',
  imports: [CarouselModule, TranslatePipe],
  templateUrl: './secondslider.component.html',
  styleUrl: './secondslider.component.css',
})
export class SecondsliderComponent {
  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplayHoverPause: true,
    autoplayTimeout: 6000,
    dots: true,
    autoplay: true,
    navSpeed: 700,
    navText: ['', ''],
    rtl: true,
    items: 1,
    nav: false,
  };
}
