import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent {
listProducts:Product[]=[
  {id:1,name: 'Coca Cola', description: 'Bebida con azúcar',price:10,stock:200},
  {id:2,name: 'Monster', description: 'Bebida con gas',price:20,stock:100}
]
}
