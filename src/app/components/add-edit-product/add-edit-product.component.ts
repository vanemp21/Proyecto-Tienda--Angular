import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Product } from '../../interfaces/product';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,NgIf],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css'
})
export class AddEditProductComponent {
form: FormGroup;
constructor(private fb:FormBuilder){
  this.form = this.fb.group({
    name:['',Validators.required],
    description:['',Validators.required],
    price:[null,Validators.required],
    stock:[null,Validators.required]
  })
}
addProduct(){
const product: Product = {
  name: this.form.value.name,
  description: this.form.value.description,
  price: this.form.value.price,
  stock: this.form.value.stock
  //console.log(product)
}
}
}
