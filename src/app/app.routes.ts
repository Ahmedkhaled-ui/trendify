import { authguardGuard } from './core/guards/authguard/authguard.guard';
import { Routes } from '@angular/router';
import { AuthComponent } from './layout/auth/auth.component';
import { MainComponent } from './layout/main/main.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { loggedguardGuard } from './core/guards/loggedguard/loggedguard.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: AuthComponent,
    canActivate: [loggedguardGuard],
    title: 'signup',
    children: [
      { path: 'signup', component: SignupComponent, title: 'signup' },
      { path: 'login', component: LoginComponent, title: 'login' },
    ],
  },
  {
    path: '',
    component: MainComponent,
    title: 'home',
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((c) => c.HomeComponent),
        title: 'home',
      },
      {
        path: 'category',
        loadComponent: () =>
          import('./pages/category/category.component').then(
            (c) => c.CategoryComponent
          ),
        title: 'category',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./pages/brands/brands.component').then(
            (c) => c.BrandsComponent
          ),
        title: 'brands',
      },
      {
        path: 'product',
        loadComponent: () =>
          import('./pages/products/products.component').then(
            (c) => c.ProductsComponent
          ),
        title: 'product',
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./pages/product-details/product-details.component').then(
            (c) => c.ProductDetailsComponent
          ),
        title: 'details',
      },
      {
        path: 'cheakout/:id',
        loadComponent: () =>
          import('./pages/check-out/check-out.component').then(
            (c) => c.CheckOutComponent
          ),
        title: 'cheakout',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./pages/cart/cart.component').then((c) => c.CartComponent),
        title: 'cart',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./pages/orders/orders.component').then(
            (c) => c.OrdersComponent
          ),
        title: 'allorders',
        canActivate: [authguardGuard],
      },
      {
        path: 'WishList',
        loadComponent: () =>
          import('./pages/wish-list/wish-list.component').then(
            (c) => c.WishListComponent
          ),
        title: 'WishList',
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
    title: 'not found',
  },
];
