import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo-table';

  public listProducts: Product[] = [];

  constructor(){

    for (let i = 1; i < 100; i++) {
        let product = {
          id:i,
          name:"Produto " + i
        };
        this.listProducts.push(product);
    }
  }
}

interface Product {
  id: number;
  name: string;
}
