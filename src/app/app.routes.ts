import { Routes } from '@angular/router';
import { MainLayout } from './core/layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/home').then(m => m.Home)
      },
      {
        path: 'catalog',
        loadComponent: () =>
          import('./features/catalog/catalog').then(m => m.Catalog)
      },
      {
        path: 'book/:id',
        loadComponent: () =>
          import('./features/book-detail/book-detail').then(m => m.BookDetail)
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./features/contact/contact').then(m => m.Contact)
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./features/cart/cart').then(m => m.Cart)
      },
      {
  path: 'login',
  loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
},
{
  path: 'register',
  loadComponent: () => import('./features/auth/register/register').then(m => m.Register)
},
{
    path: 'about',
    loadComponent: () => import('./features/about/about').then(m => m.About)
}

    ]
  },
  { path: '**', redirectTo: '' }
];
