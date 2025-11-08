import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.css'
})
export class Toast implements OnInit {
  toasts$: any; // ✅ define first

  constructor(public toastService: ToastService) {}

  ngOnInit(): void {
    // ✅ initialize here instead of at declaration
    this.toasts$ = this.toastService.toasts$;
  }
}
