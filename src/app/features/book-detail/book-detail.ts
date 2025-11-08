import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BookCard } from '../../shared/components/book-card/book-card';
import { ToastService } from '../../shared/services/toast.service';
import { CartService } from '../../shared/services/cart.service'; // ✅ Import

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, BookCard],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css'
})
export class BookDetail implements OnInit {
  quantity = 1;
  book: any = null;
  relatedBooks: any[] = [];

  books = [
    {
      id: '1',
      title: 'Classic Literature Collection',
      author: 'Various Authors',
      price: 24.99,
      originalPrice: 34.99,
      rating: 5,
      image: 'assets/images/book-classic.jpg',
      category: 'Classics'
    },
    {
      id: '2',
      title: 'Modern Fiction',
      author: 'Contemporary Writers',
      price: 18.99,
      rating: 4,
      image: 'assets/images/book-fiction.jpg',
      category: 'Fiction'
    },
    {
      id: '3',
      title: 'Science & Technology',
      author: 'Expert Contributors',
      price: 29.99,
      rating: 5,
      image: 'assets/images/book-science.jpg',
      category: 'Science'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private toast: ToastService,
    private cart: CartService // ✅ Inject cart service
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.book = this.books.find(b => b.id === id) || this.books[0];
    this.relatedBooks = this.books.filter(b => b.id !== this.book.id);
  }

  increment() {
    this.quantity++;
  }

  decrement() {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart() {
    this.cart.addToCart({ ...this.book, quantity: this.quantity });
    this.toast.show(`${this.book.title} added to cart 🛒`, 'success');
  }

  addToWishlist() {
    this.toast.show(`${this.book.title} added to wishlist ❤️`, 'info');
  }
}
