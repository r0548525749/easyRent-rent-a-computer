import { Injectable } from '@angular/core';
import { ComputerWithProgram } from '../Classes/computer-with-program';

@Injectable({
  providedIn: 'root'
})

export class ShoppingBagService {
  
  shoppingBag:Array<ComputerWithProgram>;

  constructor() {
    this.shoppingBag=[];
   }

  public getShoppingBag(){
    debugger
    return this.shoppingBag;
  }
  
}
