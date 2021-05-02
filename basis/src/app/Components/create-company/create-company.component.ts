import { Component, OnInit, Inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComputerWithProgramService } from 'src/app/Services/computer-with-program.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatachangeComponent } from '../datachange/datachange.component';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/Classes/product';
import { Company } from 'src/app/Classes/company';
import { CompanyService } from 'src/app/Services/company.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})

export class CreateComanyComponent implements OnInit {
  products: Product = new Product();
  productList: Array<Product>;
  @Input() parentData;
  dataFromManager: any;
  check: number = 0;
  DataForm: FormGroup;
  submitted = false;
  hide = true;
  company:Company=new Company();
  from:number
  constructor( private activatedRoute: ActivatedRoute,
    private CompanySer: CompanyService,
    private formBuilder: FormBuilder,
    public matdialog: MatDialogRef<DatachangeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any)
     { }

  ngOnInit() {
   if(this.data.from=="Edit")
   {
     this.from=1;
    this.company=this.data.editCompany;
   }
   else
   this.from=2;
    this.InitDataform();
  }

 
 
  InitDataform() {
    this.DataForm = this.formBuilder.group({
      CompanyName: ['', [Validators.required, Validators.minLength(2)]],     
      Img: ['', Validators.required]
    });
  }

  get f() { return this.DataForm.controls; }

  AddCompany() {
   if(this.data.from=="Edit")
   {
    this.CompanySer.updateComapny(this.company).subscribe(
      myData => { alert("add sucssesful");  this.CompanySer.list = myData;  this.onCloase();},
      myErr => { alert(myErr.message);  this.onCloase();});
   }
   else
    this.CompanySer.AddCompany(this.company).subscribe(
      myData => { alert("add sucssesful");  this.CompanySer.list = myData;  this.onCloase();},
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
      this.AddCompany();     
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
