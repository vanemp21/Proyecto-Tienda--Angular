import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../interfaces/product';
import { NgIf } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf, ProgressBarComponent],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css',
})
export class AddEditProductComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar ';
  constructor(
    private fb: FormBuilder,
    private _productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
      stock: [null, Validators.required],
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }
  getProduct(id: number) {
    this.loading = true;
    this._productService.getProduct(id).subscribe((data: Product) => {
      console.log(data);
      this.loading = false;
      this.form.setValue({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
      });
    });
  }
  addProduct() {
    const product: Product = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      stock: this.form.value.stock,
    };
    this.loading = true;
    if (this.id !== 0) {
      product.id = this.id;
      this._productService.updateProduct(this.id, product).subscribe(() => {
        this.toastr.info(
          `Producto ${product.name} actualizado correctamente!`,
          'Producto actualizado'
        );
      });
    } else {
      this._productService.saveProduct(product).subscribe(() => {
        this.toastr.success(
          `Producto ${product.name} añadido correctamente!`,
          'Producto registrado'
        );
      });
    }
    this.loading = false;
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    if (this.id != 0) {
      //Es editar
      this.operacion = 'Editar ';
      this.getProduct(this.id);
    }
  }
}
