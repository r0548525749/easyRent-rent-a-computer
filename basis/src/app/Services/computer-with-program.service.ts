import { Injectable } from '@angular/core';
import { ComputerWithProgram } from '../Classes/computer-with-program';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Computer, ComputerDetails } from '../Classes/computer';
import { Program } from '../Classes/program';
import { Softwer2 } from '../Classes/softwer2';

@Injectable({
  providedIn: 'root'
})
export class ComputerWithProgramService {
  URL: string = "http://localhost:53601/api/Computers";
  list: Array<ComputerWithProgram>;
  constructor(private http: HttpClient) {
    this.create();
  }

  create() {
    this.GetComputers().subscribe(
      myData => {
        //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
        this.list = myData;
      },
      myErr => { console.log(myErr.message); });
  }

  GetComputers(): Observable<Array<ComputerWithProgram>> {
    return this.http.get<Array<ComputerWithProgram>>(this.URL + "/GetComputers");
  }
  removeComputer(idComputer:number): Observable<Array<ComputerWithProgram>> {
    return this.http.delete<Array<ComputerWithProgram>>(this.URL + "/RemoveComputers/"+idComputer);
  }
  addComputerDetails(ComputerWithDetails:ComputerDetails):Observable<number>
  {

    return this.http.post<number>(this.URL+"/AddComputerDetails",ComputerWithDetails);
  }
  addNewComputer(computer:Computer,computerDetails:ComputerDetails,programList:Program[]):Observable<any>
  {
    debugger
 

   let a={computer,computerDetails,programList}
    return this.http.post<any>(this.URL+"/AddNewComputer",a);
  }

  updateComputer(computer:Computer):Observable<any>
  {
    return this.http.post<any>(this.URL+"/UpdateComputer",computer);
  }
  
  updateComputerDetails(ComputerWithDetails:ComputerDetails):Observable<number>
  {
    return this.http.post<number>(this.URL+"/UpdateComputerDetails",ComputerWithDetails);
  }
//עדכון והוספת תמונה
uploadImage(image,idLaptop) {
  const formData: FormData = new FormData();
  formData.append('Image', image, image.name);
  return this.http.post(this.URL +"/UploadImage/"+idLaptop, formData);

}
}