import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private firestore: AngularFirestore) { }
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
        .add(data)
        .then(res => { }, err => reject(err));
        console.log('Order SENT!!');
        
    });
  }

  //method that reads/returns coffeOrders from the firebase
  getCoffeeOrders() { 
    return this.firestore.collection("coffeeOrders").get();
  }
}
