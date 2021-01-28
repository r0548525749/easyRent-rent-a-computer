import { Injectable } from '@angular/core';
import { Versiones } from '../Classes/versiones';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersionesService {
  URL: string = "http://localhost:53601/api/Versiones";
  list: Array<Versiones>;
  constructor(private http: HttpClient) { 
    this.create();
  }
  create() {
    this.GetVersioners().subscribe(
      myData => {
        //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
        this.list = myData;
      },
      myErr => { console.log(myErr.message); });
  }

  GetVersioners(): Observable<Array<Versiones>> {

    return this.http.get<Array<Versiones>>(this.URL + "/GetVersiones");
  }
}
