import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../Classes/Order';
import { Observable } from 'rxjs';
import { Customer } from '../Classes/customer';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  URL: string = "http://localhost:53601/api/Orders";
  list: Array<Order>;
  constructor(private http: HttpClient) {
    this.create();
  }

  create() {
    this.GetOrders().subscribe(
      myData => {
        //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
        this.list = myData;
      },
      myErr => { console.log(myErr.message); });
  }

  GetOrders(): Observable<Array<Order>> {

    return this.http.get<Array<Order>>(this.URL + "/GetOrders");
  }
}