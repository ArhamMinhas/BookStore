
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, RouterModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  showSuccess = false;

  onSubmit(event: Event) {
    event.preventDefault();
    this.showSuccess = true;
    setTimeout(() => (this.showSuccess = false), 3000);
  }

  closeModal() {
    this.showSuccess = false;
  }
}
