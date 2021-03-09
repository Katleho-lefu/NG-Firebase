import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../shared/orders.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  coffeeOrders:any[]=[];

  constructor(private ordersService:OrdersService ) {}

  ngOnInit() {
    this.getCoffeeOrders();

  }


  getCoffeeOrders() {
    this.ordersService.getCoffeeOrders().toPromise().then(res => {
      res.forEach(item => {
        this.coffeeOrders.push(item.data())
        this.coffeeOrders.sort((a, b) => {
          const dateA: any = new Date(a.timeStamp), dateB: any = new Date(b.timeStamp)
         return dateB - dateA})
      })
    }).catch(err => {
      console.log(err.message); 
    })
  }

  delete(){
    console.log("delete works");
    
  }
    

}
