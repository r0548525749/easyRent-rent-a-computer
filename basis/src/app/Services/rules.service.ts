import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rule } from '../Classes/rule';

@Injectable({
  providedIn: 'root'
})
export class RulesService {

  URL: string = "http://localhost:53601/api/Rule";
  list: Array<Rule>;
  CurrentRull:number=null;
  constructor(private http: HttpClient) {
    this.create();
  }
  create() {
    this.GetRule().subscribe(
      myData => {
        //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
        this.list = myData;
      },
      myErr => { console.log(myErr.message); });
  }

  GetRule(): Observable<Array<Rule>> {

    return this.http.get<Array<Rule>>(this.URL + "/GetRules");
  }
  
  UpdateRule(s1:Rule):Observable<Array<Rule>>{
    return this.http.put<Array<Rule>>(this.URL +"/PostRules",s1);
  }
  
  AddRule(fl: Rule): Observable<Rule>
  {
    return this.http.post<Rule>(this.URL + "/PutRules", fl);
  }

  deleteRule(id:number) {  
    return this.http.delete(this.URL + "/DeleteRuleById" + id);
  }  
}
