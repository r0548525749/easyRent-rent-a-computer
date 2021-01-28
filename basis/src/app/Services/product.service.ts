import { Injectable } from '@angular/core';
import { Product } from '../Classes/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComputerDetails } from '../Classes/computer';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  URL: string = "http://localhost:53601/api/Product";
  list: Array<Product>;
  constructor(private http: HttpClient) {
    this.create();
  }
  create() {
    this.GetProduct().subscribe(
      myData => {
        //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
        this.list = myData;
      },
      myErr => { console.log(myErr.message); });
  }

  GetProduct(): Observable<Array<Product>> {

    return this.http.get<Array<Product>>(this.URL + "/GetProduct");
  }
  
  UpdateProduct(s1:Product):Observable<Array<Product>>{
    return this.http.put<Array<Product>>(this.URL +"/PostOrders",s1);
  }
  
  AddProduct(fl: Product): Observable<Product>
  {
    return this.http.post<Product>(this.URL + "/PutCompany", fl);
  }

  deleteProduct(id:number) {  
    return this.http.delete(this.URL + "/DeleteProductById" + id);
  }  
  GetProductById(id:number): Observable<Product>
  {
    return this.http.get<Product>("http://localhost:53601/api/Computers/GetComputerById/"+id);
  }
  GetProductDetails(id:number): Observable<ComputerDetails>
  {
    return this.http.get<ComputerDetails>("http://localhost:53601/api/Computers/GetComputerDetails/"+id);
  }
}
