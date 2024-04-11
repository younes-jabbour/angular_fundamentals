import { Component } from '@angular/core';
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})

export class NavbarComponent {
  title = 'productApp';
  actions: Array<any> = [
    { title: 'Home', route: '/home', icon: 'house' },
    { title: 'Products', route: '/products', icon: 'search' },
    { title: 'New product', route: '/newProduct', icon: 'plus-circle' },
  ];

  constructor(
    public appState: AppStateService,
  ) {}

  currentAction: any;

  setCurrentAction(action: any) {
    this.currentAction = action;
  }
}
