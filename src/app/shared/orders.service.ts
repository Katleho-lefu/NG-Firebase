import { EventEmitter, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  invokeOrderListComponentFunction = new EventEmitter();    
  subsVar: Subscription;  

  constructor(private firestore: AngularFirestore) {}

  form = new FormGroup({
    customerName: new FormControl(''),
    orderNumber: new FormControl(''),
    coffeeOrder: new FormControl(''),
    completed: new FormControl(false)
  });


  
       
  onFirstComponentButtonClick() {    
    this.invokeOrderListComponentFunction.emit();    
  }    


  refresh(){
    return this.getCoffeeOrders()
  }


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
      console.log('Order sent!!');

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
    console.log("im updated")
  }

  // Delete Method
  deleteCoffeeOrder(coffeeOrders) {    
    return this.firestore
      .collection("coffeeOrders")
      .doc(coffeeOrders.id)
      .delete();
  }


}
