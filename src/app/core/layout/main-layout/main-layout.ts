import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Toast } from '../../../shared/components/toast/toast';

@Component({
  selector: 'app-main-layout',
    imports: [CommonModule, RouterModule, Header, Footer, Toast],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {

}
