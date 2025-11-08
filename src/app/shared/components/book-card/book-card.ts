import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../shared/services/cart.service';
import { WishlistService } from '../../services/wishlist.services';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css',
})
export class BookCard {
  @Input() id!: string;
  @Input() title!: string;
  @Input() author!: string;
  @Input() price!: number;
  @Input() originalPrice?: number;
  @Input() rating!: number;
  @Input() image!: string;
  @Input() category?: string;

  constructor(
    private cart: CartService,
    private wishlist: WishlistService,
    private toast: ToastService
  ) {}

  handleAddToCart(event: Event) {
    event.preventDefault();
    this.cart.addToCart({
      id: this.id,
      title: this.title,
      author: this.author,
      price: this.price,
      image: this.image,
      quantity: 1,
    });
    this.toast.show(`🛒 "${this.title}" added to cart!`, 'success');
  }

  handleAddToWishlist(event: Event) {
    event.preventDefault();
    this.wishlist.addToWishlist({
      id: this.id,
      title: this.title,
      author: this.author,
      price: this.price,
      image: this.image,
      category: this.category,
    });
    this.toast.show(`❤️ "${this.title}" added to wishlist!`, 'info');
  }

  get stars() {
    return Array.from({ length: 5 });
  }
}
