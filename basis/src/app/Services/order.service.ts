import { Injectable } from '@angular/core';
import { Order } from '../Classes/Order';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComputerWithProgram } from '../Classes/computer-with-program';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

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

  GetOrderById(id: number): Observable<Array<Order>> {
    return this.http.get<Array<Order>>(this.URL + "/GetOrderbyid" + id);
  }

  UpdateOrders(s1: Order): Observable<Array<Order>> {
    return this.http.post<Array<Order>>(this.URL + "/UpdateOrder", s1);
  }

  AddOrders(fl: Order): Observable<Order> {
    debugger
    return this.http.post<Order>(this.URL + "/PostOrder", fl);
  }

  deleteOrder(id: number) :Observable<Order[]> {
    return this.http.get<Order[]>(this.URL + "/DeleteOrderById/" + id);
  }

  // chackOorderDateForComputer1(dateFrom:string,dateTo:string):Observable<ComputerWithProgramDto>{

  //   return this.http.get<boolean>(this.URL + "/ChackOorderDateForComputer?computerId="+computerId+"&dateFrom=" + dateFrom+"&dateTo="+dateTo);

  // }

  chackOorderDateForComputer(computerId: number, dateFrom: string, dateTo: string): Observable<boolean> {
    return this.http.get<boolean>(this.URL + "/ChackOorderDateForComputer?computerId=" + computerId + "&dateFrom=" + dateFrom + "&dateTo=" + dateTo);
  }

  ChackOorderDate(dateFrom: string, dateTo: string): Observable<ComputerWithProgram[]> {
    return this.http.get<ComputerWithProgram[]>(this.URL + "/ChackOorderDateTime?dateFrom=" + dateFrom + "&dateTo=" + dateTo);
  }

  CheackOrderByIdAndTime(Id: number): Observable<boolean> {
    return this.http.get<boolean>(this.URL + "/CheackOrderByIdAndTime?orderId=" + Id);
  }
  
  CheackReturnOrderByIdAndTime(Id: number): Observable<boolean> {
    return this.http.get<boolean>(this.URL + "/returnOrderById?orderId=" + Id);
  }
  
}
