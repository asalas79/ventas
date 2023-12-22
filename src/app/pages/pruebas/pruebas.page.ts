import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { PruebasService } from '../../services/pruebas.service';
import { SortEvent } from 'primeng/api';


@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.page.html',
  styleUrls: ['./pruebas.page.scss'],
})
export class PruebasPage implements OnInit {
  
  products1: Product[] =[];

  products2: Product[]=[];

  products3: Product[]=[];

  constructor(private productService: PruebasService) { }

  ngOnInit() {
      this.productService.getProductsSmall().then(data => this.products1 = data);
      //this.productService.getProductsSmall().then(data => this.products2 = data);
     // this.productService.getProductsSmall().then(data => this.products3 = data);
  }
 
  

}
