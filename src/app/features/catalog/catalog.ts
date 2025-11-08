import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookCard } from '../../shared/components/book-card/book-card';
import { RouterModule } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterModule, BookCard],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class Catalog {
  showFilters = true;

  // --- Filter Data ---
  categories = ['Fiction', 'Classics', 'Science', 'Technology', 'Romance', 'Mystery', 'Children'];
  selectedCategories: string[] = [];
  selectedPriceRange: string | null = null;
  selectedRatings: number[] = [];

  // --- Original & Filtered Book Lists ---
  books = [
    { id: '1', title: 'Classic Collection', author: 'Various Authors', price: 24.99, originalPrice: 34.99, rating: 5, image: 'assets/images/book-classic.jpg', category: 'Classics' },
    { id: '2', title: 'Modern Fiction', author: 'Contemporary Writers', price: 18.99, originalPrice: 22.99, rating: 4, image: 'assets/images/book-fiction.jpg', category: 'Fiction' },
    { id: '3', title: 'Science & Technology', author: 'Expert Contributors', price: 29.99, originalPrice: 39.99, rating: 5, image: 'assets/images/book-science.jpg', category: 'Science' },
    { id: '4', title: 'Romantic Escapes', author: 'Love Stories Collective', price: 15.49, rating: 4, image: 'assets/images/book-romance.jpg', category: 'Romance' },
    { id: '5', title: 'Children’s Adventures', author: 'Kids Collection', price: 9.99, rating: 3, image: 'assets/images/book-children.jpg', category: 'Children' },
    { id: '6', title: 'Mystery of the Mind', author: 'Sherlock Press', price: 49.99, rating: 5, image: 'assets/images/book-mystery.jpg', category: 'Mystery' }
  ];

  filteredBooks = [...this.books]; // default all

  constructor(private cart: CartService, private toast: ToastService) {}

  // --- Category Selection ---
  toggleCategory(category: string) {
    if (this.selectedCategories.includes(category)) {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    } else {
      this.selectedCategories.push(category);
    }
    this.applyFilters();
  }

  // --- Price Range Selection ---
  selectPriceRange(range: string) {
    this.selectedPriceRange = this.selectedPriceRange === range ? null : range;
    this.applyFilters();
  }

  // --- Rating Selection ---
  toggleRating(rating: number) {
    if (this.selectedRatings.includes(rating)) {
      this.selectedRatings = this.selectedRatings.filter(r => r !== rating);
    } else {
      this.selectedRatings.push(rating);
    }
    this.applyFilters();
  }

  // --- Apply Filters ---
  applyFilters() {
    this.filteredBooks = this.books.filter(book => {
      const matchCategory =
        this.selectedCategories.length === 0 ||
        this.selectedCategories.includes(book.category);

      const matchPrice =
        !this.selectedPriceRange ||
        (this.selectedPriceRange === 'under10' && book.price < 10) ||
        (this.selectedPriceRange === '10-25' && book.price >= 10 && book.price <= 25) ||
        (this.selectedPriceRange === '25-50' && book.price > 25 && book.price <= 50) ||
        (this.selectedPriceRange === 'over50' && book.price > 50);

      const matchRating =
        this.selectedRatings.length === 0 ||
        this.selectedRatings.some(r => book.rating >= r);

      return matchCategory && matchPrice && matchRating;
    });
  }

  // --- Add to Cart ---
  addToCart(book: any) {
    this.cart.addToCart({ ...book, quantity: 1 });
    this.toast.show(`${book.title} added to cart 🛒`, 'success');
  }
}
