import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-cart-item',
  imports: [CommonModule, RouterModule],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItem {
cartItems = [
    {
      id: '1',
      title: 'Classic Literature Collection',
      author: 'Various Authors',
      price: 24.99,
      quantity: 1,
      image: 'assets/images/book-classic.jpg'
    },
    {
      id: '2',
      title: 'Modern Fiction',
      author: 'Contemporary Writers',
      price: 18.99,
      quantity: 2,
      image: 'assets/images/book-fiction.jpg'
    }
  ];

  constructor(private toast: ToastService) {}

  updateQuantity(id: string, delta: number): void {
    this.cartItems = this.cartItems.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
  }

  removeItem(id: string): void {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
    this.toast.show('Item removed from cart', 'error');
  }

  get subtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  get shipping(): number {
    return this.subtotal > 50 ? 0 : 5.99;
  }

  get total(): number {
    return this.subtotal + this.shipping;
  }

  checkout(): void {
    this.toast.show('Proceeding to checkout...', 'success');
  }
}
