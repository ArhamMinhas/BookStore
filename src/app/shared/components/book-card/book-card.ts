import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // ✅ import this
@Component({
  selector: 'app-book-card',
  imports: [CommonModule, RouterModule], // ✅ add RouterModule here
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

  handleAddToCart(event: Event) {
    event.preventDefault();
    alert(`🛒 "${this.title}" added to cart!`);
  }

  handleAddToWishlist(event: Event) {
    event.preventDefault();
    alert(`❤️ "${this.title}" added to wishlist!`);
  }

  get stars() {
    return Array.from({ length: 5 });
  }

}
