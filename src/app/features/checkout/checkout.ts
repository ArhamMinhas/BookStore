import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';
import { ToastService } from '../../shared/services/toast.service';
import { AddressForm } from './address-form/address-form';
import { PaymentSummary } from './payment-summary/payment-summary';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, AddressForm, PaymentSummary],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {
  cartItems: any[] = [];
  subtotal = 0;
  shipping = 5.99;
  orderPlaced = false;

  @ViewChild(PaymentSummary) paymentSummary!: PaymentSummary;

  constructor(
    private cart: CartService,
    private toast: ToastService,
    private router: Router
  ) {
    this.cart.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.subtotal = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    });
  }

  get total() {
    return this.subtotal > 50 ? this.subtotal : this.subtotal + this.shipping;
  }

  handlePlaceOrder() {
    if (this.cartItems.length === 0) {
      this.toast.show('Your cart is empty 🛒', 'error');
      return;
    }

    this.toast.show('Processing your order...', 'info');
    this.orderPlaced = true;

    // Simulate checkout delay before success page navigation
    setTimeout(() => {
      this.toast.show('🎉 Order placed successfully!', 'success');
      this.cart.clearCart();
      this.router.navigate(['/order-success']);
    }, 2500);
  }
}
