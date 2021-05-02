import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComplaintsService } from 'src/app/Services/complaints.service';
import { Complaint } from 'src/app/Classes/complaint';
import { CustomeresService } from 'src/app/Services/customeres.service';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css']
})
export class AddReportComponent implements OnInit {
coomplainList:Array<Complaint>;
complain:Complaint;

reportForm:FormGroup;
  submitted: boolean;

  constructor( 
    private activatedRoute: ActivatedRoute, 
    private complainSer: ComplaintsService,
  private userSer:CustomeresService, 
    private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.complain=new Complaint(null,this.userSer.CurrentCustomer.Id,"",false,"");
    
    this.InitReport();
    this.InitForm();
    }
 
  InitReport(){
    this.complainSer.GetComplain().subscribe(
      myData => {
        //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
        this.coomplainList = myData;
      },
      myErr => { console.log(myErr.message); });
  }

  InitForm(){
  this.reportForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    telephon1: ['', [Validators.required, Validators.minLength(9)]],
    complain: ['', [Validators.required, Validators]],
    idComputer:['', [Validators.required, Validators]]
    })
}

  addComplain(){
    this.complain = new Complaint(0,this.userSer.CurrentCustomer.Id,this.reportForm.value.complain,false,"",this.reportForm.value.idComputer,new Date());
    this.complainSer.AddComplain(this.complain).subscribe(
      myData => { console.log("add sucssesful"); },
      myErr => { console.log(myErr.message); });
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (!this.reportForm.invalid) {
      debugger
      this.complain.Date=new Date();
      this.complainSer.AddComplain(this.complain).subscribe(
        myData => { console.log("add sucssesful"); this.complain = myData; },
        myErr => { console.log(myErr.message); });
      // this.registerForm.value.SUCCESS('::submited Succsefuky');
      return;
    }
    // display form values on success
    // console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }
} 

