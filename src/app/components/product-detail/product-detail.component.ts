import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  id: number = 0;

  currentProduct: Product = new Product()

  constructor(private productService: ProductService, private actRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const routeId = this.actRoute.snapshot.paramMap.get("id") ?? "";
    this.id = parseInt(routeId);
    this.productService.getProductByID(this.id).subscribe(foundContact => {
      this.currentProduct = foundContact;
    });
  }

  goEdit() {
    this.router.navigateByUrl(`/edit/${this.id}`);
  }

  productList: Product[] = [];

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
