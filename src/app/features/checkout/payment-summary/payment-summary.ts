import { Component, OnInit, ChangeDetectionStrategy, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../shared/services/cart.service';
import { OrderService } from '../../../shared/services/order.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-payment-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-summary.html',
  styleUrl: './payment-summary.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentSummary implements OnInit {
  cartItems: any[] = [];
  subtotal = 0;
  shipping = 0;
  total = 0;
  isPlacingOrder = false;
  showSuccessPopup = false;

  constructor(
    private cart: CartService,
    private orderService: OrderService,
    private router: Router,
    private ngZone: NgZone,
    private toast: ToastService,
    private cdr: ChangeDetectorRef // ✅ Inject this
  ) {}

  ngOnInit(): void {
    this.cart.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.updateSummary();
      this.cdr.markForCheck(); // ✅ force refresh for cart updates
    });
  }

  updateSummary() {
    this.subtotal = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.shipping = this.subtotal > 50 || this.subtotal === 0 ? 0 : 5.99;
    this.total = this.subtotal + this.shipping;
  }

  handlePlaceOrder(event?: Event) {
    event?.preventDefault();
    event?.stopPropagation();

    if (this.cartItems.length === 0) {
      this.toast.show('Your cart is empty.', 'error');
      return;
    }

    this.isPlacingOrder = true;
    this.cdr.markForCheck(); // ✅ update loader state immediately

    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        const newOrder = {
          id: 'ORD-' + Math.floor(Math.random() * 100000),
          date: new Date().toLocaleDateString(),
          total: this.total,
          status: 'Pending',
          items: [...this.cartItems]
        };

        this.ngZone.run(() => {
          this.orderService.addOrder(newOrder);
          this.cart.clearCart();

          this.isPlacingOrder = false;
          this.showSuccessPopup = true; // ✅ popup flag
          this.toast.show('🎉 Order placed successfully!', 'success');

          this.cdr.detectChanges(); // ✅ force UI to show popup
        });
      }, 800);
    });
  }

  closePopupAndNavigate() {
    this.showSuccessPopup = false;
    this.cdr.detectChanges(); // ✅ remove popup from DOM

    this.ngZone.run(() => {
      this.router.navigate(['/order-success']);
    });
  }
}
