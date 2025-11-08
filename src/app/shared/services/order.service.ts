import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private ordersSubject = new BehaviorSubject<any[]>(this.loadOrders());
  orders$ = this.ordersSubject.asObservable();

  private loadOrders(): any[] {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('orders');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  }

  getOrders() {
    return this.ordersSubject.value;
  }

  addOrder(order: any) {
    const updated = [...this.getOrders(), order];
    localStorage.setItem('orders', JSON.stringify(updated));
    this.ordersSubject.next(updated);
  }

  clearOrders() {
    localStorage.removeItem('orders');
    this.ordersSubject.next([]);
  }
}
