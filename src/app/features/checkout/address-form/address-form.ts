import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './address-form.html',
  styleUrl: './address-form.css'
})
export class AddressForm {
  address = {
    name: '',
    email: '',
    address: '',
    city: '',
    postal: ''
  };

  saveAddress(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    localStorage.setItem('checkout_address', JSON.stringify(this.address));
    console.log('✅ Address saved successfully:', this.address);
  }
}
