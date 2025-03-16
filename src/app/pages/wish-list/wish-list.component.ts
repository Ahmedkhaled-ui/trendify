import { isPlatformBrowser } from '@angular/common';
import { Data } from './../../core/interface/Icart/icart';
import {
  Component,
  computed,
  inject,
  OnInit,
  PLATFORM_ID,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Iwish } from '../../core/interface/iwish/iwish';
import { HeartWhisComponent } from '../../shared/components/ui/heart-whis/heart-whis.component';
import { OrderService } from '../../core/services/order/order.service';
import { CartService } from '../../core/services/cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wish-list',
  imports: [HeartWhisComponent],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css',
})
export class WishListComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  private readonly orderService = inject(OrderService);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);
  wishItem: WritableSignal<Iwish[]> = signal([]);
  cartId: WritableSignal<string> = signal('');
  likedCount: Signal<number> = computed(() => this.wishlistService.liked());
  ngOnInit(): void {
    this.getWishList();
    this.getCartId();
  }

  getWishList() {
    this.wishlistService.getWihlist().subscribe({
      next: (res) => {
        // console.log(res);
        this.wishItem.set(res.data);
      },
    });
  }

  getCartId() {
    this.cartService.getCart().subscribe({
      next: (res) => {
        this.cartId.set(res.cartId);
      },
    });
  }

  addCart(id: string) {
    this.cartService.addCart(id).subscribe({
      next: (res) => {
        // console.log(res);
        this.cartService.numberOfItem.set(res.numOfCartItems);
      },
    });
  }

  payNow(id: string) {
    this.addCart(id);

    // this.router.navigate(['/cart']);
    setTimeout(() => {
      this.checkOut();
    }, 2000);
  }

  checkOut() {
    this.router.navigate([`/cheakout/:${this.cartId}`]);
  }
}
