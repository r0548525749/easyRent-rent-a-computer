import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Program } from 'src/app/Classes/program';
import { ProgramesService } from 'src/app/Services/programes.service';
import { DatachangeComponent } from '../datachange/datachange.component';

@Component({
  selector: 'app-program-change',
  templateUrl: './program-change.component.html',
  styleUrls: ['./program-change.component.css']
})
export class ProgramChangeComponent implements OnInit {

  // constructor( private formBuilder: FormBuilder,
  //   public matdialog: MatDialogRef<DatachangeComponent>,
  //   @Inject(MAT_DIALOG_DATA) public data: any) { }

    @Input() parentData;
    DataForm: FormGroup;
    submitted = false;
    hide = true;
  from:number
    constructor( private activatedRoute: ActivatedRoute,
      private ProgramSer:ProgramesService,
      private formBuilder: FormBuilder,
      public matdialog: MatDialogRef<DatachangeComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any)
       { }
  
    ngOnInit() {
     debugger 
      this.InitDataform();
      if(this.data.from=="Edit")
     { this.program=this.data.editProgram
      this.from=1
     }
     else
     this.from=0;
    }
  
   
    program:Program=new Program();
    InitDataform() {
      this.DataForm = this.formBuilder.group({
        ProgramName: ['', [Validators.required, Validators.minLength(2)]],     
        Img: ['', Validators.required],
        Comment:['',Validators.required]
      });
    }
  
    get f() { return this.DataForm.controls; }
  
    AddProgram() {
     if(this.data.from=="Edit")
     {
this.ProgramSer.updateProgram(this.program).subscribe(
  myData => { alert("add sucssesful"); this.ProgramSer.list=myData;  this.onCloase();},
  myErr => { alert(myErr.message);  this.onCloase();});
     }
     else
      this.ProgramSer.AddProgram(this.program).subscribe(
        myData => { alert("add sucssesful"); this.ProgramSer.list=myData;  this.onCloase();},
        myErr => { alert(myErr.message);  this.onCloase();});
    }
  
    edit() {
      // this.data = this.products;
      // this.CompanySer.(this.products).subscribe(
      //   myData => { console.log("update sucssesful"); },
      //   myErr => { console.log(myErr.message); });
    }
  
    onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.DataForm.invalid) {
        this.DataForm.reset();
      }
      else {
        debugger
        this.AddProgram();
       
      }
    }
    
    onCloase() {
      this.submitted = false;
      this.matdialog.close();
    }
  
    onReset() {
      this.submitted = false;
      this.DataForm.reset();
    }
  }
  
