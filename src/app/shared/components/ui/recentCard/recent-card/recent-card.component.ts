import { Data } from './../../../../../core/interface/Icart/icart';
import { Iwish } from './../../../../../core/interface/iwish/iwish';
import { WishlistService } from './../../../../../core/services/wishlist/wishlist.service';
import { CartService } from './../../../../../core/services/cart/cart.service';
import { RouterLink, CanActivateFn, Router } from '@angular/router';
import { Iproduct } from '../../../../../core/interface/iproduct';
import {
  Component,
  computed,
  inject,
  input,
  InputSignal,
  WritableSignal,
  signal,
  OnInit,
} from '@angular/core';
import { AuthenticationService } from '../../../../../core/services/Authentication/authentication.service';
import { HeartWhisComponent } from '../../heart-whis/heart-whis.component';

@Component({
  selector: 'app-recent-card',
  imports: [RouterLink, HeartWhisComponent],
  templateUrl: './recent-card.component.html',
  styleUrl: './recent-card.component.css',
})
export class RecentCardComponent {
  cartService = inject(CartService);
  authenticationService = inject(AuthenticationService);
  wishlistService = inject(WishlistService);
  router = inject(Router);
  login = computed(() => this.authenticationService.userToken());
  dataWish: WritableSignal<string[]> = signal([]);
  data: InputSignal<Iproduct> = input.required();
  // @Input() data!: Iproduct;

  addCard(id: string) {
    if (localStorage.getItem('userToken')) {
      this.cartService.addCart(id).subscribe({
        next: (res) => {
          console.log(res.data);
          this.cartService.numberOfItem.set(res.numOfCartItems);
        },
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
