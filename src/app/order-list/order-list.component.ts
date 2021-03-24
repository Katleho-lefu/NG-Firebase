import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../shared/orders.service';

@Component({
  selector: 'list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  coffeeOrders:any[]=[];

  constructor(private ordersService:OrdersService ) {}

  ngOnInit() {
    this.getCoffeeOrders();
    console.log(this.coffeeOrders);
    
  }

//Getting back orders from firebase and pushing them into an array so we can loop in the view
  getCoffeeOrders() {
    this.ordersService.getCoffeeOrders().toPromise().then(res => {
      res.forEach((item: any) => {        
        this.coffeeOrders.push({id: item.id, ...item.data()})
        this.coffeeOrders.sort((a, b) => {
          const dateA: any = new Date(a.timeStamp), dateB: any = new Date(b.timeStamp)
         return dateB - dateA})
      })
    }).catch(err => {
      console.log(err.message); 
    })
  }

  //Updating method
  markCompleted = data => this.ordersService.updateCoffeeOrder(data);

  //delete order
   deleteOrder (data){
    this.ordersService.deleteCoffeeOrder(data).then(()=>{
      this.coffeeOrders = []
      this.getCoffeeOrders()
      console.log('Deleted order');
    }).catch(err => {
      return err.message
    })
   }
}
