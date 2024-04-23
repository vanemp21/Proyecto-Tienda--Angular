import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, CommonModule, ProgressBarComponent],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css',
})
export class ListProductsComponent implements OnInit {
  loading: boolean = false;
  listProducts: Product[] = [];
  constructor(private _productService: ProductService) {}
  ngOnInit(): void {
    this.getListProducts();
  }
  getListProducts() {
    this.loading = true;
    this._productService.getListProducts().subscribe((data) => {
      this.listProducts = data;
    });
    this.loading = false;
  }
}
