import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) {}

  addMobile(mobile: any) {

    mobile.id=this.afs.createId();
    return this.afs.collection("Mobile/").add(mobile);
  }

  getAllMobile()
  {
    return this.afs.collection("Mobile/").snapshotChanges();
  }


  updateMobile(mobile: any)
  {
    return this.afs.doc("Mobile/"+mobile.id).update(mobile);
  }

  deleteMobile(id: string)
  {
    return this.afs.doc("Mobile/"+id).delete();
  }

  getMobileById(id: string)
  {
    return this.afs.doc("Mobile/"+id).valueChanges();
  }

  addCustomer(customer: any) {

    customer.id=this.afs.createId();
    return this.afs.collection("Customer/").add(customer);
  }

  getallCustomer()
  {
    return this.afs.collection("Customer/").snapshotChanges();
  } 

  deleteCustomer(id: string)
  {
    return this.afs.doc("Customer/"+id).delete();
  }

  updateCustomer(customer: any)
  {
    return this.afs.doc("Customer/"+customer.id).update(customer);
  }
  
   getCustomerById(id: string)
  {
    return this.afs.doc("Customer/"+id).valueChanges();
  }

  

}
