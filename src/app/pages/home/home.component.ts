import { Category, Iproduct } from '../../core/interface/iproduct';
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RecentCardComponent } from '../../shared/components/ui/recentCard/recent-card/recent-card.component';
import { TabsComponent } from '../../shared/components/ui/tabs/tabs/tabs.component';
import { ProductsService } from '../../core/services/products/products.service';
import { ServecComponent } from './components/servec/servec.component';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategory } from '../../core/interface/Icategory/icategory';
import { DiscoverComponent } from './components/discover/discover.component';
import { NewCollectionComponent } from './components/new-collection/new-collection.component';
import { SecondsliderComponent } from './components/secondslider/secondslider.component';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [
    TranslatePipe,
    RouterLink,
    CarouselModule,
    RecentCardComponent,
    TabsComponent,
    ServecComponent,
    DiscoverComponent,
    NewCollectionComponent,
    SecondsliderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  productList: WritableSignal<Iproduct[]> = signal([]);
  catrgory: WritableSignal<Icategory[]> = signal([]);
  ngOnInit(): void {
    this.getProducts();
    this.getCategory();
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    rtl: true,
    autoplayHoverPause: true,
    autoplay: true,
    autoplayTimeout: 3000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 3,
      },
      400: {
        items: 4,
      },
      740: {
        items: 8,
      },
      940: {
        items: 8,
      },
    },
    nav: false,
  };
  getProducts() {
    this.productsService.getAllProduct().subscribe({
      next: (res) => {
        // console.log(res);
        this.productList.set(res.data);
      },
      error: (err) => {
        // console.log(err);
      },
    });
  }

  getCategory() {
    this.categoriesService.getAllCategory().subscribe({
      next: (res) => {
        this.catrgory.set(res.data);
      },
    });
  }
}
