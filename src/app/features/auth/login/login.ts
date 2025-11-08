import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';
@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private router: Router, private toast: ToastService) {}

  onSubmit(event: Event) {
    event.preventDefault();
    this.toast.show('✅ Login successful! Redirecting to Home...', 'success');
    setTimeout(() => this.router.navigate(['/']), 1500);
  }
}
