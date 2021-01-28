import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomeresService } from 'src/app/Services/customeres.service';
import { Customer } from 'src/app/Classes/customer';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MustMatch } from '../Helpers/must-match/must-match.component';
import { ErrorStateMatcher, MatDialogConfig, MatDialog } from '@angular/material';
import { Software } from 'src/app/Classes/software';
import { HelloComponent } from '../hello/hello.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
// <?php
// $connect = pg_connect('localhost', 'postgres');
// $results = pg_query('select sum(points), $connect);
// echo $results;


// ?>

// <script src="https://cdn.jsdelivr.net/npm/vue"></script>
@Component({
  selector: 'app-existingcostomer',
  templateUrl: './existingcostomer.component.html',
  styleUrls: ['./existingcostomer.component.css']
})

export class ExistingcostomerComponent implements OnInit {
  customers: Customer = new Customer();
  customerList: Array<Customer>;
  registerForm: FormGroup;
  submitted = false;
  hide = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerSer: CustomeresService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    // this.router.navigateByUrl(['/viewComp']);
    this.InitCustomer();
    this.InitRegisterForm();
  }

  InitRegisterForm() {
    this.registerForm = this.formBuilder.group({
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  InitCustomer() {
    this.activatedRoute.params.subscribe(
      myParam => {
        this.customerSer.GetCoustomer().subscribe(
          myData => {
            this.customerList = myData;
          },
          myErr => { console.log(myErr.message); });
      }
    )
  }

  // check1() {
  //   var c = new Customer();
  //   c.Gmail = this.registerForm.value["email"];
  //   c.Password = this.registerForm.value["password"];
  //   this.customerSer.CostumerLogin(c).subscribe(
  //     myData => { 
  //       console.log("add sucssesful");
     
  //       this.router.navigate(['/viewComp']);
  //   },
  //     myErr => { console.log(myErr.message); 
      
  //     })
  //   if (this.customerSer.CostumerLogin(c)!=undefined) {
     
  //   }
  //   else
  
  //   this.customerSer.CurrentCustomer = this.customers;
  // }
  
  get f() { return this.registerForm.controls; }

  onSubmit() {
    var c = new Customer();
    if(this.registerForm.value["email"]==null || this.registerForm.value["password"]==null){
          alert("חסר שם משתמש או סיסמה.");
           return;
    }
    c.Gmail = this.registerForm.value["email"];
    c.Password = this.registerForm.value["password"];
    this.customerSer.CostumerLogin(c).subscribe(
      myData => { console.log("add sucssesful");this.customers = myData;
      console.log("lolgin my data", myData)
      this.customerSer.CurrentCustomer=myData;
      this.router.navigate(['/viewComp']);
    },
      myErr => { console.log(myErr.message); 
        alert("שם משתתמש וסיסמה לא נכונים.");
      }) 
    this.customerSer.CurrentCustomer = this.customers;
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
    // this.router.navigateByUrl(['/try/']);
  }

}