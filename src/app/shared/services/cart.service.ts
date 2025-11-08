import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: string;
  title?: string;
  price: number;
  quantity: number;
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private cartCountSubject = new BehaviorSubject<number>(0);

  cartItems$ = this.cartItemsSubject.asObservable();
  cartCount$ = this.cartCountSubject.asObservable();

  addToCart(item: Partial<CartItem> & { id: string; price: number; quantity?: number }) {
    const qty = item.quantity ?? 1;
    const existing = this.cartItems.find(b => b.id === item.id);
    if (existing) {
      existing.quantity = (existing.quantity || 0) + qty;
    } else {
      this.cartItems.push({ ...item, quantity: qty } as CartItem);
    }
    this.emitCart();
  }

  /**
   * Replace entire cart with provided items (useful for bulk updates)
   */
  updateCart(items: CartItem[]) {
    this.cartItems = items.map(i => ({ ...i, quantity: Math.max(1, i.quantity || 1) }));
    this.emitCart();
  }

  removeItem(id: string) {
    this.cartItems = this.cartItems.filter(i => i.id !== id);
    this.emitCart();
  }

  clearCart() {
    this.cartItems = [];
    this.emitCart();
  }

  getItems(): CartItem[] {
    return [...this.cartItems];
  }

  private emitCart() {
    // push snapshot of items and update count
    this.cartItemsSubject.next([...this.cartItems]);
    const count = this.cartItems.reduce((sum, i) => sum + (i.quantity || 0), 0);
    this.cartCountSubject.next(count);
  }
}
