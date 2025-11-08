import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../shared/services/cart.service';
import { WishlistService } from '../../../shared/services/wishlist.services';
import { SearchService } from '../../../shared/services/search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  cartCount = 0;
  wishlistCount = 0;
  searchTerm = '';

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.cartService.cartCount$.subscribe(count => (this.cartCount = count));
    this.wishlistService.wishlist$.subscribe(items => (this.wishlistCount = items.length));
  }

  onSearchChange(event: any) {
    const term = event.target.value;
    this.searchTerm = term;
    this.searchService.setSearchTerm(term);
  }
}
