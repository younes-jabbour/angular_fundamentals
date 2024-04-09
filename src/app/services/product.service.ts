import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../model/product.model';

@Injectable({
  providedIn: 'root',
})

export class ProductService {
  constructor(private http: HttpClient) {
  }

  public getProducts(keyword: string, page: number = 1, size: number = 4) {
    return this.http.get(`http://localhost:8080/product?name_like=${keyword}&_page=${page}&_limit=${size}`, {observe: 'response'});
  }

  public checkProduct(product: Product): Observable<Product> {
    return this.http.patch<Product>(`http://localhost:8080/product/${product.id}`, {
      checked: !product.checked,
    });
  }

  public deleteProduct(product: Product): Observable<Product> {
    return this.http.delete<any>(`http://localhost:8080/product/${product.id}`);
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`http://localhost:8080/product`, product);
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:8080/product/${productId}`)
  }


  updateProduct(product: Product) {
    return this.http.put<Product>(`http://localhost:8080/product/${product.id}`, product);
  }
}
