import { Component, OnInit } from '@angular/core';
import { Time } from '@angular/common';
import { RulesService } from 'src/app/Services/rules.service';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/Services/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css']
})
export class ReturnComponent implements OnInit {
  submitted:false;
  time:Time;
  disabled:false;
  returnForm:FormGroup;

  constructor(private rulesSer: RulesService, private router: Router,
    private orderSer:OrderService,private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.returnForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', [Validators.required, Validators.minLength(6)]],
      numOrder: ['', [Validators.required, Validators.minLength(9)]],
      complain: ['', [Validators.required, Validators]]
      })  }
addSum(){
  // this.rulesSer.CurrentRull=aaa;
}
CheackReturnOrderByIdAndTime(){
  //alert(this.borureForm.value.numOrder);
  alert(this.returnForm.value.numOrder)

  debugger
  this.orderSer.CheackReturnOrderByIdAndTime(this.returnForm.value.numOrder).subscribe(
    myData => {
      //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
      if(myData==true){
        alert("החזרת המוצר נקלטה במערכת")
      }
      else{
        alert("מצטערים, אין אפשרות להשאיל")
      }
    },
    myErr => { console.log(myErr.message); });
}
}
