import { Injectable } from '@angular/core';
import { Customer } from '../Classes/customer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../Classes/Order';

@Injectable({
  providedIn: 'root'
})
export class CustomeresService {

  URL: string = "http://localhost:53601/api/Costumer";
  list: Array<Customer>;
  CurrentCustomer:Customer=undefined;
  constructor(private http: HttpClient) {
    this.create();
  }
  
 CheckUserExist() {
  if(this.get("name")!=null){
    this.GetCostumerbyid(+this.get("id")).subscribe(data=>{
      this.CurrentCustomer=data;
      alert("refresh success")
    })
  }}

  //  CheckUserExist() {
  //   if(this.CurrentCustomer==undefined)
  //       {
  //         if(sessionStorage.getItem("userId")){
  //           this.GetCostumerbyid(+sessionStorage.getItem("userId")).subscribe(data=>
  //             this.CurrentCustomer=data
  //             )
  //         }
  //       }
  // }

  create() {
    this.GetCoustomer().subscribe(
      myData => {
        //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
        this.list = myData;
      },
      myErr => { console.log(myErr.message); });
  }
  GetCoustomer(): Observable<Array<Customer>> {

    return this.http.get<Array<Customer>>(this.URL + "/GetCostumer");
  }

  addCustomerOnServer(fl: Customer): Observable<Customer>
  {
    //כאשר ניגשים לשרת בשיטת post
    //הנתונים נשלחים בפרמטר נפרד, ולא כחלק מהכתובת
    return this.http.post<Customer>(this.URL + "/PostCostumer", fl);
  }

  GetCostumerbyid(id:number): Observable<Customer>
  {
    return this.http.get<Customer>(this.URL + "/GetCostumerbyid/" + id);
  }
  GetCostumerbyEmail(email:string): Observable<Customer>
  {
    return this.http.get<Customer>(this.URL + "/GsetCostumerbyGmail/" + email+"/");
  }

  CostumerLogin(c:Customer): Observable<Customer>
  {
    return this.http.post<Customer>(this.URL + "/CostumerLogin",c);
  }
  GetLandbyCustomerId(id:number): Observable<Array<Order>> {

    return this.http.get<Array<Order>>(this.URL + "/GetLandbyCustomerId/" + id);
  }

  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  get(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }
}
