import {
  Component,
  computed,
  inject,
  input,
  InputSignal,
  OnInit,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { WishlistService } from '../../../../core/services/wishlist/wishlist.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-heart-whis',
  imports: [],
  templateUrl: './heart-whis.component.html',
  styleUrl: './heart-whis.component.css',
})
export class HeartWhisComponent implements OnInit {
  dataWish: WritableSignal<string[]> = signal([]);

  router = inject(Router);
  wishlistService = inject(WishlistService);

  data: InputSignal<any> = input();

  constructor() {}
  ngOnInit(): void {
    this.getWishList();
    // console.log(this.data);
  }

  addWishList(id: string) {
    if (localStorage.getItem('userToken')) {
      this.wishlistService.addWihlist(id).subscribe({
        next: (res) => {
          // console.log(res);
          this.dataWish.set(res.data);
          this.getWishList();
        },
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  removeWishList(id: string) {
    this.wishlistService.removeWihlist(id).subscribe({
      next: (res) => {
        this.dataWish.set(res.data);

        this.getWishList();
      },
    });
  }

  getWishList() {
    this.wishlistService.getWihlist().subscribe({
      next: (res) => {
        // console.log(res);

        this.dataWish.set(res.data.map((item: any) => item._id));
        this.wishlistService.liked.set(res.count);
      },
    });
  }
}
