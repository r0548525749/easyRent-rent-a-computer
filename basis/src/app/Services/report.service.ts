import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  URL: string = "http://localhost:53601/api/Report";
   reports:{[label:string]:number}={};
   constructor(private http: HttpClient) {
    this.create();
  }

  create() {
    this.GetComputersUsageReport().subscribe(
      myData => {
        //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
        this.reports = myData;
      },
      myErr => { console.log(myErr.message); });
  }

  GetComputersUsageReport(): Observable<any> {
    return this.http.get<any>(this.URL + "/GetComputersUsageReport");
  }
  GetCountMounthLendReport():Observable<any>
  {
    return this.http.get<any>(this.URL+"/GetCountMounthLendReport")
  }
}
