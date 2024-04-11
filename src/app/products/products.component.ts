import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private router: Router,
    public appState: AppStateService
  ) {}

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
    this.appState.setProductState({
      ...this.appState.productState,
      status: 'loading',
    });
    this.productService
      .getProducts(
        this.appState.productState.keyword,
        this.appState.productState.currentPage,
        this.appState.productState.pageSize
      )
      .subscribe({
        next: (res) => {
          // @ts-ignore
          let products = res.body as Product[];
          let totalCount = parseInt(res.headers.get('X-Total-Count')!);
          let totalPages = Math.floor(
            totalCount / this.appState.productState.pageSize
          );
          // @ts-ignore
          if (totalCount % this.pageSize !== 0) {
            totalPages++;
          }

          this.appState.setProductState({
            products: products,
            totalCount: totalCount,
            totalPages: totalPages,
            status: 'done',
          });
        },
        error: (err) => {
          this.appState.setProductState({
            products: [],
            totalCount: 0,
            totalPages: 0,
            status: 'error',
            errorMessage: err,
          });
        },
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
      next: (value) => {
        // @ts-ignore
        this.appState.productState.products =
          this.appState.productState.products.filter(
            (p : Product) => p.id !== product.id
          );
        this.searchProducts();
      },
    });
  }

  handleGotoPage(page: number) {
    this.appState.productState.currentPage = page;

    this.searchProducts();
  }

  handleEditProduct(product: Product) {
    this.router.navigateByUrl(`/edit-product/${product.id}`);
  }
}
