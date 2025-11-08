import { Component, EventEmitter, Output, Input, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../shared/services/cart.service';
import { OrderService } from '../../../shared/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-summary.html',
  styleUrl: './payment-summary.css'
})
export class PaymentSummary implements OnInit {
  @Input() cartItems: any[] = [];
  @Input() subtotal: number = 0;
  @Input() shipping: number = 0;
  @Input() total: number = 0;

  @Output() placeOrder = new EventEmitter<void>();

  isPlacingOrder = false;
  showSuccessPopup = false;

  constructor(
    private cart: CartService,
    private orderService: OrderService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.cart.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.updateSummary();
    });
  }

  updateSummary() {
    this.subtotal = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.shipping = this.subtotal > 50 || this.subtotal === 0 ? 0 : 5.99;
    this.total = this.subtotal + this.shipping;
  }

  // 🧠 Prevent address form interference
  handlePlaceOrder(event?: Event) {
    if (event) event.stopPropagation();
    if (event) event.preventDefault(); // 🚫 stops form submit reload

    if (this.cartItems.length === 0) return;

    this.isPlacingOrder = true;

    // Simulated delay — smooth UX
    setTimeout(() => {
      const newOrder = {
        id: 'ORD-' + Math.floor(Math.random() * 100000),
        date: new Date().toLocaleDateString(),
        total: this.total,
        status: 'Pending',
        items: [...this.cartItems]
      };

      this.orderService.addOrder(newOrder);
      this.cart.clearCart();

      this.ngZone.run(() => {
        this.isPlacingOrder = false;
        this.showSuccessPopup = true;
      });
    }, 1000);
  }

  closePopupAndNavigate() {
    this.showSuccessPopup = false;
    this.ngZone.run(() => {
      this.router.navigate(['/order-success']);
    });
  }
}
