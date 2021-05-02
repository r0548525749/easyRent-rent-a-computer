import { Component, OnInit } from '@angular/core';
import { Time } from '@angular/common';
import { ContentDialogComponent } from 'src/app/Components/content-dialog/content-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelloComponent } from '../hello/hello.component';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-borure',
  templateUrl: './borure.component.html',
  styleUrls: ['./borure.component.css']
})
export class BorureComponent implements OnInit {
  time:Time;
  disabled:false;
  submitted:false;
  orderList;
  borureForm:FormGroup;
ttt=false
t=false
  constructor(private activatedRoute: ActivatedRoute,
    private orderSer:OrderService,
     private formBuilder: FormBuilder,
      private _formBuilder: FormBuilder,
       private dialog: MatDialog) { }

  ngOnInit() {
    this.InitForm();
  }

  InitForm(){
    this.borureForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', [Validators.required, Validators.minLength(6)]],
      numOrder: ['', [Validators.required, Validators.minLength(9)]],
      complain: ['', [Validators.required, Validators]]
      })
  }

  openDialog() {
    const dialogRef = this.dialog.open(ContentDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  create() {
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = true;
    DialogConfig.autoFocus = true;
    DialogConfig.width = "100%";
    DialogConfig.height = "100%";
    DialogConfig.data = {};
    const dialogRef = this.dialog.open(HelloComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  CheackOrderByIdAndTime(){
    //alert(this.borureForm.value.numOrder);
    
    this.orderSer.CheackOrderByIdAndTime(this.borureForm.value.numOrder).subscribe(
      myData => {
        //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
        if(myData==true){
         this.ttt=true
          alert("השאלתך נקלטה במערכת")   
        }
        else{
          this.t=true
          alert("מצטערים, אין אפשרות להשאיל")
        }
      },
      myErr => { console.log(myErr.message); });
  }
}
