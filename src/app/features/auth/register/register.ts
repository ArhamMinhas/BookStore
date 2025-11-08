import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router,RouterModule } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  constructor(private router: Router, private toast: ToastService) {}

  onSubmit(event: Event) {
    event.preventDefault();
    this.toast.show('🎉 Registration successful! Redirecting to Sign In...', 'success');
    setTimeout(() => this.router.navigate(['/login']), 1500);
  }
}
