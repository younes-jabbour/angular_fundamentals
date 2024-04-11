import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private host:string = environment.API_URL;

  constructor(private http: HttpClient) {}

  public getProducts(keyword: string, page: number = 1, size: number = 4) {
    return this.http.get(
      `${this.host}?name_like=${keyword}&_page=${page}&_limit=${size}`,
      { observe: 'response' }
    );
  }

  public checkProduct(product: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.host}/${product.id}`, {
      checked: !product.checked,
    });
  }

  public deleteProduct(product: Product): Observable<Product> {
    return this.http.delete<any>(`${this.host}/${product.id}`);
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.host}`, product);
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.host}/${productId}`);
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(`${this.host}/${product.id}`, product);
  }
}
