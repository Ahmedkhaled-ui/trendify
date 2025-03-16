import {
  afterNextRender,
  Component,
  computed,
  ElementRef,
  inject,
  Signal,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Icart } from '../../core/interface/Icart/icart';
import { AuthenticationService } from '../../core/services/Authentication/authentication.service';
import { CartService } from '../../core/services/cart/cart.service';
import { OrderService } from '../../core/services/order/order.service';
import { FormerrorComponent } from '../../shared/components/ui/formerror/formerror.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  imports: [ReactiveFormsModule, FormerrorComponent],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css',
})
export class CheckOutComponent {
  private readonly cartService = inject(CartService);
  private readonly orderService = inject(OrderService);
  private readonly authenticationService = inject(AuthenticationService);
  private readonly router = inject(Router);
  isLargeScreen: WritableSignal<boolean> = signal(false);
  isAddAddress: boolean = false;
  ChoosePaymentMethod: boolean = false;
  userId: Signal<any> = computed(() => this.authenticationService.userToken());
  typePay: WritableSignal<string> = signal('');
  Product: boolean = false;
  itemsCart: Icart = {} as Icart;
  shippingAddress: FormGroup = new FormGroup({
    details: new FormControl(null, Validators.required),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
    city: new FormControl(null, Validators.required),
  });

  constructor() {
    afterNextRender(() => {
      this.isLargeScreen.set(window.innerWidth >= 768);
    });
  }
  ngOnInit(): void {
    // console.log(this.userId().id);
    this.getItemCart();
  }

  addAddress() {
    this.isAddAddress = !this.isAddAddress;
  }
  chooseMethod() {
    this.ChoosePaymentMethod = !this.ChoosePaymentMethod;
  }
  type(type: string) {
    this.typePay.set(type);
    // console.log(type);
  }

  getItemCart() {
    this.cartService.getCart().subscribe({
      next: (res) => {
        // console.log(res);
        this.itemsCart = res;
        // console.log(this.itemsCart);
      },
    });
  }

  pay() {
    if (this.shippingAddress.valid && this.typePay() != '') {
      if (this.typePay() == 'cash') {
        this.cashOrder();
      } else if (this.typePay() == 'online') {
        this.payment();
      }
      this.shippingAddress.reset();
    } else {
      this.isAddAddress = true;
      this.shippingAddress.markAllAsTouched();
      this.ChoosePaymentMethod = true;
    }
  }

  payment() {
    this.orderService
      .payment(this.itemsCart.cartId, this.shippingAddress.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          open(res.session.url);
        },
      });
  }

  cashOrder() {
    this.orderService
      .cashOrder(this.itemsCart.cartId, this.shippingAddress.value)
      .subscribe({
        next: (res) => {
          // console.log(res);
          this.router.navigate(['/orders']);
        },
      });
  }

  showProduct() {
    this.Product = !this.Product;
  }

  submit() {
    this.shippingAddress.markAllAsTouched();
    if (this.shippingAddress.valid) {
      this.pay();
      // console.log(this.shippingAddress.value);
    }
  }
}
