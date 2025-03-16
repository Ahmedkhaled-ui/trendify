import {
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { OrderService } from '../../core/services/order/order.service';
import { AuthenticationService } from '../../core/services/Authentication/authentication.service';
import { Iorder } from '../../core/interface/iorder/iorder';

@Component({
  selector: 'app-orders',
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  private readonly orderService = inject(OrderService);
  private readonly authenticationService = inject(AuthenticationService);
  userId: Signal<any> = computed(() => this.authenticationService.userToken());

  allOrder: WritableSignal<Iorder[]> = signal([]);
  // allOrder: Iorder = {} as Iorder;

  ngOnInit(): void {
    this.getOrder();
    console.log(this.userId().id);
  }

  getOrder() {
    this.orderService.getUserOrder(this.userId().id).subscribe({
      next: (res) => {
        console.log(res);
        this.allOrder.set(res);
      },
    });
  }
}
