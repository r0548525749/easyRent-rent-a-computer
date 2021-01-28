import { Injectable } from '@angular/core';
import { Members } from '../Classes/Members';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  URL: string = "http://localhost:53601/api/Members";
  list: Array<Members>;
  constructor(private http: HttpClient) {
    this.create();
  }
  create() {
    this.GetMembers().subscribe(
      myData => {
        //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
        this.list = myData;
      },
      myErr => { console.log(myErr.message); });
  }

  GetMembers(): Observable<Array<Members>> {

    return this.http.get<Array<Members>>(this.URL + "/GetMembers");
  }
  FilteringByPrice(price:number): Observable<Array<Members>> {

    return this.http.get<Array<Members>>(this.URL + "/FilteringByPrice/" + price);
  }
}
