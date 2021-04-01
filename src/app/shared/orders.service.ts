import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private firestore: AngularFirestore) {}

  coffeeOrders: any =[];

  public subject = new Subject<any>();
  private coffee_orders = new  BehaviorSubject(this.coffeeOrders);


  form = new FormGroup({
    customerName: new FormControl(''),
    orderNumber: new FormControl(''),
    coffeeOrder: new FormControl(''),
    completed: new FormControl(false)
  });

  //method to create an order in firebase
  createCoffeeOrder(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("coffeeOrders")
        .add({
          customerName: data.customerName,
          orderNumber: data.orderNumber,
          coffeeOrder: data.coffeeOrder,
          completed: data.completed,
          timeStamp: Date.now()
        })
        .then(() => {}, 
        err => reject(err));
    });
  }

  //method that reads/returns coffeOrders from the firebase
  getCoffeeOrders() {
    return this.firestore.collection("coffeeOrders").get();
  }

  //method to update/ edit the table
  updateCoffeeOrder(data) {
    return this.firestore
      .collection("coffeeOrders")
      .doc(data.payload.doc.id)
      .set({ completed: true }, { merge: true });
  }

  // Delete Method
  deleteCoffeeOrder(coffeeOrders) {    
    return this.firestore
      .collection("coffeeOrders")
      .doc(coffeeOrders.id)
      .delete().then(()=>{this.refresh()})
      // .then(()=>{
      //   this.coffeeOrders = []
      //   this.getCoffeeOrders()
      // })
      
  }

  //refresh
  refresh(){
    this.coffeeOrders = []
    this.getCoffeeOrders()
    console.log('Deleted order');
   }


}
