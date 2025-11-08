import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../../shared/services/wishlist.services';
import { CartService } from '../../shared/services/cart.service';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css'
})
export class Wishlist implements OnInit {
  wishlistItems: any[] = [];

  constructor(
    private wishlist: WishlistService,
    private cart: CartService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.wishlist.wishlist$.subscribe(items => (this.wishlistItems = items));
  }

  addToCart(book: any) {
    this.cart.addToCart({ ...book, quantity: 1 });
    this.toast.show(`${book.title} added to cart 🛒`, 'success');
  }

  removeFromWishlist(id: string) {
    this.wishlist.removeFromWishlist(id);
    this.toast.show(`Removed from wishlist ❤️`, 'error');
  }
}
