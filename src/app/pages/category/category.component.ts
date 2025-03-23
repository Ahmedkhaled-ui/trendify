import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategory } from '../../core/interface/Icategory/icategory';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-category',
  imports: [TranslatePipe],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  categoryData: WritableSignal<Icategory[]> = signal([]);
  ngOnInit(): void {
    this.getCategory();
  }
  getCategory() {
    this.categoriesService.getAllCategory().subscribe({
      next: (res) => {
        console.log(res);
        this.categoryData.set(res.data);
      },
    });
  }
}
