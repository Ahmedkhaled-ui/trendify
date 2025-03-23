import {
  afterNextRender,
  Component,
  inject,
  Inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TabsComponent } from '../../shared/components/ui/tabs/tabs/tabs.component';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../core/interface/iproduct';
import { RecentCardComponent } from '../../shared/components/ui/recentCard/recent-card/recent-card.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  imports: [
    TranslatePipe,
    CarouselModule,
    TabsComponent,
    RecentCardComponent,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  productList: WritableSignal<Iproduct[]> = signal([]);
  arrayLength: WritableSignal<number> = signal(0);
  showList: boolean = false;
  isLargeScreen: WritableSignal<boolean> = signal(false);
  constructor() {
    afterNextRender(() => {
      this.isLargeScreen.set(window.innerWidth >= 768);
    });
  }
  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this.productsService.getAllProduct().subscribe({
      next: (res) => {
        this.productList.set(res.data);
        this.arrayLength.set(this.productList().length);
      },
    });
  }

  getReletedProducts(id?: string) {
    this.productsService.getAllProduct(id).subscribe({
      next: (res) => {
        this.productList.set(res.data);
        this.arrayLength.set(this.productList().length);
      },
    });
  }
  show() {
    this.showList = !this.showList;
  }
}
