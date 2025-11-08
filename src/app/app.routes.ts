import { Routes } from '@angular/router';
import { MainLayout } from './core/layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      // Home
      {
        path: '',
        loadComponent: () =>
          import('./features/home/home').then(m => m.Home),
      },

      // Catalog
      {
        path: 'catalog',
        loadComponent: () =>
          import('./features/catalog/catalog').then(m => m.Catalog),
      },

      // Book Details
      {
        path: 'book/:id',
        loadComponent: () =>
          import('./features/book-detail/book-detail').then(m => m.BookDetail),
      },

      // Cart
      {
        path: 'cart',
        loadComponent: () =>
          import('./features/cart/cart').then(m => m.Cart),
      },

      // Checkout
      {
        path: 'checkout',
        loadComponent: () =>
          import('./features/checkout/checkout').then(m => m.Checkout),
      },

      // Wishlist
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./features/wishlist/wishlist').then(m => m.Wishlist),
      },

      // About
      {
        path: 'about',
        loadComponent: () =>
          import('./features/about/about').then(m => m.About),
      },

      // Contact
      {
        path: 'contact',
        loadComponent: () =>
          import('./features/contact/contact').then(m => m.Contact),
      },

      // Auth
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login').then(m => m.Login),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register/register').then(m => m.Register),
      },

      // ✅ Order Success
      {
        path: 'order-success',
        loadComponent: () =>
          import('./features/order-success/order-success').then(
            m => m.OrderSuccess
          ),
      },

      // ✅ Order History
      {
        path: 'order-history',
        loadComponent: () =>
          import('./features/order-history/order-history').then(
            m => m.OrderHistory
          ),
      },
    ],
  },

  // Redirect Wildcard
  { path: '**', redirectTo: '' },
];
