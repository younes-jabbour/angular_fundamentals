import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})

export class EditProductComponent implements OnInit {
  productId!: number;
  productFormGroup!: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder, private productService: ProductService) {
  }

  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.params['id'];
    this.productService.getProductById(this.productId).subscribe({
      next: (product) => {
        this.productFormGroup = this.fb.group({
          id: this.fb.control(product.id),
          name: this.fb.control(product.name),
          price: this.fb.control(product.price),
          checked: this.fb.control(product.checked),
        })
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  updateProduct() {
    let product: Product = this.productFormGroup.value;
    this.productService.updateProduct(product).subscribe({
      next: (product) => {
        alert("Product updated successfully");
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
