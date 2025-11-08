import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookCard } from '../../shared/components/book-card/book-card';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, BookCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  featuredBooks = [
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
      originalPrice: 39.99,
      rating: 5,
      image: 'assets/images/book-science.jpg',
      category: 'Science'
    },
    {
      id: '4',
      title: 'Classic Literature Collection',
      author: 'Various Authors',
      price: 24.99,
      rating: 5,
      image: 'assets/images/book-classic.jpg'
    }
  ];

}
