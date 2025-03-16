import {
  afterNextRender,
  Component,
  computed,
  HostListener,
  inject,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { AuthenticationService } from '../../core/services/Authentication/authentication.service';
import { filter } from 'rxjs';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { TranslatePipe } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/myTranslate/my-translate.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly myTranslateService = inject(MyTranslateService);
  router = inject(Router);
  hideLogOut: boolean = false;
  userToken: Signal<any> = computed(() =>
    this.authenticationService.userToken()
  );
  numberIfCartItem: Signal<number> = computed(() =>
    this.cartService.numberOfItem()
  );
  numberIfLiked: Signal<number> = computed(() => this.wishlistService.liked());
  isHomePage: boolean = false;
  bgNav: WritableSignal<boolean> = signal(false);
  showNavItem: boolean = false;
  dropdown: boolean = false;
  typeLang: WritableSignal<boolean> = signal(true);

  constructor() {
    afterNextRender(() => {
      this.showNavItem = window.innerWidth > 768;
      this.lang(localStorage.getItem('lang')!);
    });
  }
  ngOnInit(): void {
    this.isHomePage = this.router.url === '/home';
    // this.userToken.set(this.authenticationService.userToken());
    this.nav();
  }

  nav() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isHomePage = event.urlAfterRedirects === '/home';
      });

    this.cartService.getCart().subscribe({
      next: (res) => {
        this.cartService.numberOfItem.set(res.numOfCartItems);
      },
    });

    this.wishlistService.getWihlist().subscribe({
      next: (res) => {
        this.wishlistService.liked.set(res.count);
      },
    });
  }
  logout() {
    this.hideLogOut = !this.hideLogOut;
  }
  userLogOut() {
    this.authenticationService.signOut();
  }

  @HostListener('window:scroll') onscroll() {
    if (scrollY > 900) {
      this.bgNav.set(true);
    } else {
      this.bgNav.set(false);
    }
  }
  showNav() {
    this.showNavItem = !this.showNavItem;
  }

  dropDown() {
    this.dropdown = !this.dropdown;
  }
  lang(lang: string) {
    this.myTranslateService.changeLang(lang);
    this.dropdown = false;
    if (localStorage.getItem('lang') == 'ar') {
      this.typeLang.set(false);
    }
  }
}
