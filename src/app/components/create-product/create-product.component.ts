import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  newProduct: Product = new Product()

  constructor(private productService: ProductService, private router: Router) {
    this.newProduct.price = NaN;
   }

  ngOnInit(): void {
  }

  onSubmit(){
    this.newProduct.price = Number(this.newProduct.price);

    this.productService.createNewProduct(this.newProduct).subscribe(response => {
      this.router.navigateByUrl("/products")
    })
  }

}
