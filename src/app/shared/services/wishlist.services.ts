import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private wishlistKey = 'wishlist';
  private wishlistItems: any[] = [];
  private wishlistSubject = new BehaviorSubject<any[]>([]);

  wishlist$ = this.wishlistSubject.asObservable();

  constructor() {
    // ✅ Check if running in browser before using localStorage
    if (this.isBrowser()) {
      const stored = localStorage.getItem(this.wishlistKey);
      this.wishlistItems = stored ? JSON.parse(stored) : [];
      this.wishlistSubject.next(this.wishlistItems);
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  addToWishlist(item: any) {
    if (!this.wishlistItems.find(b => b.id === item.id)) {
      this.wishlistItems.push(item);
      this.updateWishlist();
    }
  }

  removeFromWishlist(id: string) {
    this.wishlistItems = this.wishlistItems.filter(i => i.id !== id);
    this.updateWishlist();
  }

  clearWishlist() {
    this.wishlistItems = [];
    this.updateWishlist();
  }

  getWishlist() {
    return [...this.wishlistItems];
  }

  private updateWishlist() {
    if (this.isBrowser()) {
      localStorage.setItem(this.wishlistKey, JSON.stringify(this.wishlistItems));
    }
    this.wishlistSubject.next([...this.wishlistItems]);
  }
}
