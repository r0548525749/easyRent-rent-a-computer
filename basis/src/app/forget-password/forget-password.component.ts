import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../Classes/customer';
import { CustomeresService } from '../Services/customeres.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  customers: Customer = new Customer();
  customerList: Array<Customer>;
  registerForm: FormGroup;
  registerForm1: FormGroup;

  submitted = false;
  hide = true;
  show=true
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

  get f() { return this.registerForm.controls; }

  onSubmit() {
    if(this.registerForm.invalid)
    return;
    var c = new Customer();
    debugger
    if(this.registerForm.value["email"]==""){
          alert("חסר שם משתמש.");
           return;
    }
    c.Gmail = this.registerForm.value["email"];
    this.customerSer.GetCostumerbyEmail(c.Gmail).subscribe(
      myData => { console.log("add sucssesful");this.customers = myData;
      alert( myData)
      this.customerSer.CurrentCustomer=myData;
      this.router.navigate(['/existing']);
    },
      myErr => { console.log(myErr.message); 
        alert("שם משתתמש לא נכון.");
      }) 
    this.customerSer.CurrentCustomer = this.customers;
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
    // this.router.navigateByUrl(['/try/']);
  }
}
