import {Component, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Product} from '../model/product.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: Array<Product> = [];
  keyword: string = "";
  totalPages: number = 0;
  pageSize: number = 3;
  currentPage: number = 1;

  constructor(private productService: ProductService, private router : Router) {
  }

  /**
   la 1ʳᵉ methode qui s'execute lors de l'initialisation du composant.
   */
  ngOnInit() {
    /**
     * Get products
     */
    this.searchProducts();

  }

  public searchProducts() {
    this.productService.getProducts(this.keyword, this.currentPage, this.pageSize).subscribe({
      next: (res) => {
        this.products = res.body as Product[];
        let totalProduct: number = parseInt(res.headers.get('X-Total-Count')!);
        this.totalPages = Math.floor(totalProduct / this.pageSize);
        // @ts-ignore
        if (totalProduct % this.pageSize !== 0) {
          this.totalPages++;
        }
      },
      error: (err) => console.log(err),
    });
  }

  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product).subscribe({
      next(updatedProduct) {
        product.checked = updatedProduct.checked;
      },
    });
  }

  handleDeleteProduct(product: Product) {
    this.productService.deleteProduct(product).subscribe({
      next: value => {
        this.products = this.products.filter(p => p.id !== product.id);
      }
    });
  }

  handleGotoPage(page: number) {
    this.currentPage = page;

    this.searchProducts();
  }

  handleEditProduct(product: Product) {
  this.router.navigateByUrl(`/edit-product/${product.id}`);
  }
}
