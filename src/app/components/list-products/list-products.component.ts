import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [RouterLink, CommonModule, ProgressBarComponent],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css',
})
export class ListProductsComponent implements OnInit {
  loading: boolean = false;
  listProducts: Product[] = [];
  constructor(
    private _productService: ProductService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getListProducts();
  }
  getListProducts() {
    this.loading = true;
    this._productService.getListProducts().subscribe((data: Product[]) => {
      this.listProducts = data;
    });
    this.loading = false;
  }

  deleteProduct(id: number) {
    this.loading = true;
    this._productService.deleteProduct(id).subscribe(() => {
      this.getListProducts();
    });
    this.toastr.warning(
      'El producto fue eliminado con éxito',
      'Producto eliminado'
    );
  }
}
