import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  cartItems: any[] = [];

  constructor(
    private cart: CartService,
    private toast: ToastService,
    private router: Router // ✅ Added Router for navigation
  ) {}

  ngOnInit(): void {
    this.cart.cartItems$.subscribe(items => (this.cartItems = items));
  }

  updateQuantity(id: string, delta: number) {
    const updated = this.cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );
    this.cart.updateCart(updated);
  }

  removeItem(id: string) {
    this.cart.removeItem(id);
    this.toast.show('Item removed from cart 🗑️', 'error');
  }

  get subtotal() {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  get shipping() {
    return this.subtotal > 50 ? 0 : 5.99;
  }

  get total() {
    return this.subtotal + this.shipping;
  }

  checkout() {
    this.toast.show('Proceeding to checkout...', 'success');
    this.router.navigate(['/checkout']); // ✅ Smooth navigation
  }
}
