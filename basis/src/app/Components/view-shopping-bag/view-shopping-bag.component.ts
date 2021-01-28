import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../Helpers/must-match/must-match.component';
import { ShoppingBagService } from 'src/app/Services/shopping-bag.service';
import { Software } from 'src/app/Classes/software';
import { CustomeresService } from 'src/app/Services/customeres.service';
import { Router } from '@angular/router';
import { Customer } from 'src/app/Classes/customer';
import * as swal from 'sweetalert';
import { OrderService } from 'src/app/Services/order.service';
import { ComputerWithProgram } from 'src/app/Classes/computer-with-program';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-view-shopping-bag',
  templateUrl: './view-shopping-bag.component.html',
  styleUrls: ['./view-shopping-bag.component.css']
})
export class ViewShoppingBagComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  options: FormGroup;
  shoppingBag: Array<ComputerWithProgram>;
  customers: Customer = new Customer();
  index: any;
  constructor(private formBuilder: FormBuilder,
    private shoppingBagSer: ShoppingBagService,
    private customerSer: CustomeresService, private router: Router,private orderSer:OrderService) { }

    displayedColumns: string[] = ['Id', 'CompanyName', 'Type', 'Prossess','Memory','HardDisk','ScreenSize','Programslist','RemoveItem'];
    dataSource =null;
  
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  ngOnInit() {
    this.shoppingBag = this.shoppingBagSer.getShoppingBag();
    this.options = this.formBuilder.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    debugger
    this.dataSource=new MatTableDataSource<ComputerWithProgram>(this.shoppingBag);
    this.dataSource.paginator = this.paginator;

  }

  onCange(id: number) {
    if (this.customerSer.CurrentCustomer != null) {
      // swal("Are you sure you want to do this?", {
      //   buttons: ["Oh noez!", true],
      // });
        // this.orderSer.AddOrders().subscribe(
        //   myData => {
        //     //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
        //     this.softwareList = myData;
        //   },
          // myErr => { console.log(myErr.message); });
     
      this.router.navigate(['/existingCustomerDetails/']);
    }
    else
      this.router.navigate(['/viewComp']);
  }
  
  // DeleteFromBag(soft1: ComputerWithProgram) {
  //   this.index = this.bagSoftwer.findIndex(c => c.Id == soft1.Id);
  //   if (this.index != -1) {
  //     this.bagSoftwer.splice(this.index, 1);
  //     this.count--;
  //     console.log(this.count);
  //   }
  //   this.index = this.shoppingBagSer.shoppingBag.findIndex(c => c.Id == soft1.Id);
  //   if (this.index != -1) {
  //     this.shoppingBagSer.shoppingBag.splice(this.index, 1);
  //     this.count--;
  //     console.log(this.count);
  //   }
  // }
}
