import { Injectable } from '@angular/core';
import { Software } from '../Classes/software';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SoftwaresService {
  URL: string = "http://localhost:53601/api/Softwares";
  list: Array<Software>;
  constructor(private http: HttpClient) {
    this.create();
  }

  create() {
    this.GetSoftwares().pipe(tap(() => console.log('STOP'))).subscribe(
      myData => {
        //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
        this.list = myData;
      },
      myErr => { console.log(myErr.message); });
  }

  GetSoftwares(): Observable<Array<Software>> {
    console.log('START');
    return this.http.get<Array<Software>>(this.URL + "/GetSoftwares");
  }
  UpdateSoftwer(s1: Software): Observable<Array<Software>> {
    return this.http.put<Array<Software>>(this.URL + "/PutSoftware", s1);
  }

  addSoftwerOnServer(fl: Software): Observable<Software> {
    return this.http.post<Software>(this.URL + "/PostSoftware", fl);
  }
  
  deletePost(id): Observable<boolean> {
    return this.http.delete<boolean>(this.URL + "/DeleteSoftwaresById/" + id);
  }

  FilteringByName(name: string): Observable<Array<Software>> {

    return this.http.get<Array<Software>>(this.URL + "/FilteringByName/" + name);
  }
  FilteringByVersion(version: number): Observable<Array<Software>> {

    return this.http.get<Array<Software>>(this.URL + "/FilteringByVersion/" + version);
  }
}
// return this.http.delete<boolean>(this.URL + "/DeleteSoftwaresById?id=" + id+"&name="+m);

