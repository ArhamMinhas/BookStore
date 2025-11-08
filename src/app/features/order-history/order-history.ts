import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderCard } from '../orders/order-card/order-card';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, OrderCard],
  templateUrl: './order-history.html',
  styleUrl: './order-history.css'
})
export class OrderHistory implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orders = this.orderService.getOrders();
  }
}
