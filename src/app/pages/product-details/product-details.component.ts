import { Category } from './../../core/interface/iproduct';
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../core/interface/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { HeartWhisComponent } from '../../shared/components/ui/heart-whis/heart-whis.component';
import { OrderService } from '../../core/services/order/order.service';
import { RecentCardComponent } from '../../shared/components/ui/recentCard/recent-card/recent-card.component';

@Component({
  selector: 'app-product-details',
  imports: [HeartWhisComponent, RecentCardComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly orderService = inject(OrderService);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);
  prodectDetails: Iproduct = {} as Iproduct;
  relatedPro: WritableSignal<Iproduct[]> = signal([]);
  cartId: WritableSignal<string> = signal('');
  ngOnInit(): void {
    this.getIdProduct();
    this.getCartId();
  }

  getIdProduct() {
    this.activatedRoute.paramMap.subscribe({
      next: (res: any) => {
        // console.log(res.params.id);
        this.getSupProduct(res.params.id);
      },
    });
  }

  getSupProduct(id: string) {
    this.productsService.getSpecProduct(id).subscribe({
      next: (res) => {
        // console.log(res.category.id);

        this.prodectDetails = res.data;
        // console.log(this.prodectDetails);
        this.getRelatedProduct(this.prodectDetails.category._id);
      },
    });
  }

  getRelatedProduct(categoryId: string) {
    this.productsService.getAllProduct(categoryId).subscribe({
      next: (res) => {
        // console.log(res, 'ffffffffffffffffff');

        this.relatedPro.set(res.data);
        // console.log(this.relatedPro());
      },
    });
  }

  addCart(id: string) {
    if (localStorage.getItem('userToken')) {
      this.cartService.addCart(id).subscribe({
        next: (res) => {
          // console.log(res);
          this.cartService.numberOfItem.set(res.numOfCartItems);
        },
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
  getCartId() {
    this.cartService.getCart().subscribe({
      next: (res) => {
        // console.log(res.cartId);
        console.log(res);
        this.cartId.set(res.cartId);
      },
    });
  }
  payNow(id: string) {
    if (localStorage.getItem('userToken')) {
      this.addCart(id);

      // this.router.navigate(['/cart']);
      setTimeout(() => {
        this.checkOut();
      }, 2000);
    } else {
      this.router.navigate(['/login']);
    }
  }

  checkOut() {
    this.router.navigate([`/cheakout/:${this.cartId}`]);
  }
}
