import {
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../core/interface/Icart/icart';
import { HeartWhisComponent } from '../../shared/components/ui/heart-whis/heart-whis.component';
import { OrderService } from '../../core/services/order/order.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [HeartWhisComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly orderService = inject(OrderService);
  private readonly router = inject(Router);
  number: Signal<number> = computed(() => this.cartService.numberOfItem());
  itemsCart: Icart = {} as Icart;
  ngOnInit(): void {
    this.getItemCart();
  }

  getItemCart() {
    this.cartService.getCart().subscribe({
      next: (res) => {
        // console.log(res);
        this.itemsCart = res;
        // console.log(this.itemsCart);

        this.cartService.numberOfItem.set(res.numOfCartItems);
      },
    });
  }
  deleteItems(id: string) {
    console.log(id);

    this.cartService.deletCartItem(id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartService.numberOfItem.set(res.numOfCartItems);
        this.itemsCart = res;
      },
    });
  }

  countOfItem(id: string, count: number) {
    this.cartService.updateCart(id, `${count}`).subscribe({
      next: (res) => {
        // console.log(res);
      },
    });
  }
}
