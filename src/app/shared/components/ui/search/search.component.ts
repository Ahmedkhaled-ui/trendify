import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ProductsService } from '../../../../core/services/products/products.service';
import { Iproduct } from '../../../../core/interface/iproduct';
import { RecentCardComponent } from '../recentCard/recent-card/recent-card.component';
import { SearchPipe } from '../../../pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [RecentCardComponent, SearchPipe, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  data: WritableSignal<Iproduct[]> = signal([]);
  private readonly productsService = inject(ProductsService);
  name: string = '';
  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    this.productsService.getAllProduct().subscribe({
      next: (res) => {
        this.data.set(res.data);
      },
    });
  }
}
