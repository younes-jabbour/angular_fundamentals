import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit {
  // declaration des variable ici
  public productForm!: FormGroup;
  public keyword: any;

  constructor(private formBuilder: FormBuilder, private productService: ProductService, public appState: AppStateService) {
  }

  ngOnInit() {

    this.productForm = this.formBuilder.group({
      name: this.formBuilder.control('', Validators.required),
      price: this.formBuilder.control(0),
      checked: this.formBuilder.control(false),
    });
  }

  public saveProduct() {
    let product: Product = this.productForm.value;

    this.productService.saveProduct(product).subscribe({
      next: product => {
        alert(JSON.stringify(product));
      },
      error: (err) => {
      this.appState.setProductState({
        error:"error",
        errorMessage: err,
      })
      }
    });
  }

}
