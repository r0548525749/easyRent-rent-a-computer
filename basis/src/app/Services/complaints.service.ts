import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Complaint } from '../Classes/complaint';

@Injectable({
  providedIn: 'root'
})

export class ComplaintsService {
  URL: string = "http://localhost:53601/api/Complaint";
  list: Array<Complaint>;
  constructor(private http: HttpClient) {
    this.create();
  }

  create() {
    this.GetComplain().subscribe(
      myData => {
        //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
        this.list = myData;
      },
      myErr => { console.log(myErr.message); });
  }

  GetComplain(): Observable<Array<Complaint>> {
    return this.http.get<Array<Complaint>>(this.URL + "/GetComplaint");
  }

  AddComplain(fl: Complaint): Observable<Complaint> {
    return this.http.post<Complaint>(this.URL + "/PostComplaint", fl);
  }

  deleteComplain(id:number) {
    return this.http.delete(this.URL + "/DeleteComplaintById/" + id);
  }

}
