import { Injectable } from '@angular/core';
import { Program } from '../Classes/program';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProgramWithVersion } from '../Classes/programWithVersion';

@Injectable({
  providedIn: 'root'
})
export class ProgramesService {
  URL: string = "http://localhost:53601/api/programs";
  list: Array<Program>;

  constructor(private http: HttpClient) { 
    this.create();
  } 
  create() {
    this.GetPrograms().subscribe(
      myData => {
        //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
        this.list = myData;
      },
      myErr => { console.log(myErr.message); });
  }

  GetPrograms(): Observable<Array<Program>> {

    return this.http.get<Array<Program>>(this.URL + "/GetProgram");
  }
  GetProgramWithVersion():Observable<Array<ProgramWithVersion>>
  {
    return this.http.get<Array<ProgramWithVersion>>(this.URL + "/GetProgramWithVersion");
  }
  AddProgram(p:Program): Observable<Array<Program>>
  {
    return this.http.post<Array<Program>>(this.URL + "/PostProgram",p);

  }
  updateProgram(p:Program): Observable<Array<Program>>
  {
    
    return this.http.put<Array<Program>>(this.URL + "/PutProgram",p);

  }
  RemoveProgram(id:number) :Observable<Array<Program>>
  {
    return this.http.delete<Array<Program>>(this.URL + "/DeleteProgramById/" + id);
  }
}
