import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: Product[] = [];
  sortBy: string = '';
  id: number = 0;
  currentProduct: Product = new Product()

  constructor(private productService: ProductService, private actRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(foundContacts => {
      this.productList = foundContacts;
    })
    const routeId = this.actRoute.snapshot.paramMap.get("id") ?? "";
    this.id = parseInt(routeId);
    this.productService.getProductByID(this.id).subscribe(foundContact => {
      this.currentProduct = foundContact;
    })
  }

  sortProducts(): void {
    this.productService.sortProducts(this.sortBy)
      .subscribe(products => this.productList = products);
  }

  loadContacts() {
    this.productService.getAllProducts().subscribe(foundProducts => {
      this.productList = foundProducts;
      this.router.navigateByUrl("/products");
    });
  }

  onDelete(id: number) {
    this.productService.deleteProductByID(id).subscribe(response => {
      this.loadContacts();
    });
  }

}
