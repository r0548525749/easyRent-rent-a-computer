import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../Classes/company';

@Injectable({
  providedIn: 'root'
})

export class CompanyService {
  URL: string = "http://localhost:53601/api/Company";
  list: Array<Company>;
  constructor(private http: HttpClient) {
    this.create();
  }

  create() {
    this.GetCompanies().subscribe(
      myData => {
        //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
        this.list = myData;
      },
      myErr => { console.log(myErr.message); });
  }

  GetCompanies(): Observable<Array<Company>> {
    return this.http.get<Array<Company>>(this.URL + "/GetCompanies");
  }

  AddCompany(c: Company): Observable<Array<Company>> {
    return this.http.post<Array<Company>>(this.URL + "/AddCompany", c);
  }
  
  RemoveCompany(id: number): Observable<Array<Company>>
  {
    return this.http.delete<Array<Company>>(this.URL + "/RemoveCompany/"+ id);
  }

  updateComapny(c:Company): Observable<Array<Company>> {
    return this.http.put<Array<Company>>(this.URL + "/UpdateCompany", c);
  }

}
