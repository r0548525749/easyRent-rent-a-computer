import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComputerKind } from '../Classes/computer';


@Injectable({
  providedIn: 'root'
})

export class TypeCompuetService {
  URL: string = "http://localhost:53601/api/Type";
  list: Array<ComputerKind>;
  constructor(private http: HttpClient) {
    this.create();
  }

  create() {
    this.GetTypes().subscribe(
      myData => {
        //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
        this.list = myData;
      },
      myErr => { console.log(myErr.message); });
  }

  GetTypes(): Observable<Array<ComputerKind>> {
    return this.http.get<Array<ComputerKind>>(this.URL + "/GetTypes");
  }

  AddType(fl: ComputerKind): Observable<ComputerKind> {
    return this.http.post<ComputerKind>(this.URL + "/PostType", fl);
  }



}
