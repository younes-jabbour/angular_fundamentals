import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'productApp';
  actions: Array<any> = [
    { title: 'Home', route: '/home', icon: 'house' },
    { title: 'Products', route: '/products', icon: 'search' },
    { title: 'New product', route: '/newProduct', icon: 'plus-circle' },
    // { title: 'Edit product', route: '/editProduct', icon: 'pen' },
  ];

  currentAction: any;

  setCurrentAction(action: any) {
    this.currentAction = action;
  }
}
