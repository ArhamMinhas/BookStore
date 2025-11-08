import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    // Load existing cart from localStorage
    const stored = localStorage.getItem('cartItems');
    if (stored) this.cartItemsSubject.next(JSON.parse(stored));
  }

  /** Get current items */
  getItems() {
    return this.cartItemsSubject.getValue();
  }

  /** Add an item */
  addToCart(item: any) {
    const items = this.getItems();
    const existing = items.find(i => i.id === item.id);

    if (existing) {
      existing.quantity += item.quantity || 1;
    } else {
      items.push({ ...item, quantity: item.quantity || 1 });
    }

    this.updateCart(items);
  }

  /** Update cart (persist to localStorage) */
  updateCart(items: any[]) {
    localStorage.setItem('cartItems', JSON.stringify(items));
    this.cartItemsSubject.next(items);
  }

  /** Remove item */
  removeItem(id: string) {
    const updated = this.getItems().filter(i => i.id !== id);
    this.updateCart(updated);
  }

  /** Clear all */
  clearCart() {
    localStorage.removeItem('cartItems');
    this.cartItemsSubject.next([]);
  }
}
