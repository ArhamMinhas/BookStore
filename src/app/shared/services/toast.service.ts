import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();
  private idCounter = 0;

  show(message: string, type: 'success' | 'error' | 'info' = 'success') {
    const id = this.idCounter++;
    const toast: Toast = { id, message, type };
    const toasts = [...this.toastsSubject.value, toast];
    this.toastsSubject.next(toasts);

    // Auto remove after 3 seconds
    setTimeout(() => this.remove(id), 3000);
  }

  remove(id: number) {
    this.toastsSubject.next(this.toastsSubject.value.filter(t => t.id !== id));
  }
}
