import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from 'src/app/Classes/customer';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from 'src/app/Services/home.service';
import { CustomeresService } from 'src/app/Services/customeres.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../Helpers/must-match/must-match.component';
import { MatStepper } from '@angular/material';
import { DatachangeComponent } from '../datachange/datachange.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Software } from 'src/app/Classes/software';
import { HelloComponent } from '../hello/hello.component';
import { ContentDialogComponent } from 'src/app/content-dialog/content-dialog.component';
import {CardModule} from 'ngx-card/ngx-card';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  customers: Customer = new Customer();
  customerList: Array<Customer>;
  check: number = 0;
  registerForm: FormGroup;
  submitted = false;
  hide = true;
  router: any;
  options: FormGroup;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  engineerForm: FormGroup;
  Software: Software;
sum:10
disabled = false;

  // @ViewChild('stepper') stepper: MatStepper;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private customerSer: CustomeresService, 
    private formBuilder: FormBuilder,
     private _formBuilder: FormBuilder,
      private dialog: MatDialog) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.options = this.formBuilder.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
    this.activatedRoute.params.subscribe(
      myParam => {
        this.customerSer.GetCoustomer().subscribe(
          myData => {
            this.customerList = myData;
          },
          myErr => { console.log(myErr.message); });
      }
    )
    
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      telephon1: ['', [Validators.required, Validators.minLength(9)]],
      telephon2: ['', [Validators.required, Validators.minLength(9)]],
      // userName: ['', [Validators.required, Validators]],
      confirmPassword: ['', Validators.required],
    },
      { validator: MustMatch('password', 'confirmPassword') });
    this.engineerForm = this.formBuilder.group({
      insurance: [undefined, Validators.required],
      subscription: [undefined, Validators.required]
    })
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

  check1() {
    alert(this.registerForm.value["firstName"])
  }

  AddCustomer() {
    this.customers = new Customer(0, this.registerForm.value.firstName, this.registerForm.value.password, this.registerForm.value.email
      , 1, this.registerForm.value.lastName
      , this.registerForm.value.telephon1, this.registerForm.value.telephon2, "null", 1);
    this.customerSer.addCustomerOnServer(this.customers).subscribe(
      myData => { console.log("add sucssesful"); },
      myErr => { console.log(myErr.message); });
    this.customerSer.CurrentCustomer = this.customers;
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.customerSer.addCustomerOnServer(this.customers).subscribe(
        myData => { console.log("add sucssesful"); this.customers = myData; },
        myErr => { console.log(myErr.message); });
      // this.registerForm.value.SUCCESS('::submited Succsefuky');
      return;
    }
    // display form values on success
    // console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
    this.router.navigateByUrl(['/try/']);
  }

  next() {
    console.log(this.engineerForm);
    //check
    // stepper.next();  
  }

  openDialog() {
    const dialogRef = this.dialog.open(ContentDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
//    card = new Card({
//     // a selector or DOM element for the form where users will
//     // be entering their information
//     form: 'form', // *required*
//     // a selector or DOM element for the container
//     // where you want the card to appear
//     container: '.card-wrapper', // *required*

//     formSelectors: {
//         numberInput: 'input#number', // optional — default input[name="number"]
//         expiryInput: 'input#expiry', // optional — default input[name="expiry"]
//         cvcInput: 'input#cvc', // optional — default input[name="cvc"]
//         nameInput: 'input#name' // optional - defaults input[name="name"]
//     },

//     width: 200, // optional — default 350px
//     formatting: true, // optional - default true

//     // Strings for translation - optional
//     messages: {
//         validDate: 'valid\ndate', // optional - default 'valid\nthru'
//         monthYear: 'mm/yyyy', // optional - default 'month/year'
//     },

//     // Default placeholders for rendered fields - optional
//     placeholders: {
//         number: '•••• •••• •••• ••••',
//         name: 'Full Name',
//         expiry: '••/••',
//         cvc: '•••'
//     },

//     masks: {
//         cardNumber: '•' // optional - mask card number
//     },

//     // if true, will log helpful messages for setting up Card
//     debug: false // optional - default false
// });
}
