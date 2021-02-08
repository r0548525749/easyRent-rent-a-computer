import { Component, OnInit, ViewChild ,AfterViewInit} from '@angular/core';
import { OrdercomponentComponent } from '../ordercomponent/ordercomponent.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/Classes/Order';
import { OrderService } from 'src/app/Services/order.service';
import { CustomeresService } from 'src/app/Services/customeres.service';
import { Customer } from 'src/app/Classes/customer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ShoppingBagService } from 'src/app/Services/shopping-bag.service';
import { ComputerWithProgram, ComputerWithProgramWithDate } from 'src/app/Classes/computer-with-program';
import { ComputerWithProgramService } from 'src/app/Services/computer-with-program.service';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-exsisting-customer-details',
  templateUrl: './exsisting-customer-details.component.html',
  styleUrls: ['./exsisting-customer-details.component.css']
})
export class ExsistingCustomerDetailsComponent implements OnInit , AfterViewInit {
  orderList: Array<Order>;
  customers: Customer = new Customer();
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  options: FormGroup;
  shoppingBag: Array<ComputerWithProgram>;
  ComputerListWithDate:ComputerWithProgramWithDate[];
  displayedColumns: string[] = ['Id',"FromDate","EndDate", 'CompanyName', 'Type', 'Prossess','Memory','HardDisk','ScreenSize','Programslist','RemoveItem'];
  dataSource =null;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('showFirstLastButtons',{ static: true })  paginator(pager:MatPaginator) {
    if (pager) this.dataSource.paginator = pager;
  }

  constructor(private activatedRoute: ActivatedRoute,
     private orderSer: OrderService,
    private CustomerSer: CustomeresService, 
    private formBuilder: FormBuilder, private router: Router,
    private shoppingBagSer:ShoppingBagService,
    private compSer:ComputerWithProgramService) { }
    today:Date
  ngOnInit() {
    this.goTo();
    this.today=new Date();
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
  }

  goTo(){
    if(this.CustomerSer.CurrentCustomer!=undefined&&this.CustomerSer.CurrentCustomer!=null){
       this.CustomerSer.GetLandbyCustomerId(this.CustomerSer.CurrentCustomer.Id).subscribe(
      myData => {
        this.ComputerListWithDate=new Array();
        this.orderList = myData;
        for(let i=0;i<this.orderList.length;i++)
       { let c=this.compSer.list.find(c=>c.Id=this.orderList[i].ProudactId)
        let tOrF=true
        if(new Date(this.orderList[i].ToDate).getTime()<new Date(this.today).getTime())
        tOrF=true
        else
        tOrF=false
       this.ComputerListWithDate.push(new ComputerWithProgramWithDate(c.Id,c.LepTopId,c.CompanyId,c.CompanyName,c.ComputerImg,c.Type,c.Prossess,c.Memory,c.HardDisk,c.ScreenSize,c.ComputerImg,c.Programslist,this.orderList[i].FromDate,this.orderList[i].ToDate,this.orderList[i].Id,tOrF));
      }
      this.sortByDueDate(this.ComputerListWithDate)
        this.dataSource=new MatTableDataSource<ComputerWithProgramWithDate>(this.ComputerListWithDate);
        this.dataSource.paginator = this.paginator;
      },
      myErr => { console.log(myErr.message); });
    }
    else{
      alert("יש להכנס כלקוח");
      this.router.navigate(['/existing/']);
    }
  }
  
  HistoryUser(userId: number) {
    if (this.CustomerSer.CurrentCustomer != undefined && this.CustomerSer.CurrentCustomer != null) {
      this.CustomerSer.GetLandbyCustomerId(userId).subscribe(
        myData => {
          // this.orderList = myData;
        },
        myErr => { console.log(myErr.message); });
      console.log(this.orderList);
      this.router.navigate(['/existingCustomerDetails/']);
    }
    else
      this.router.navigate(['/viewComp']);
    // this.CustomerSer.GetLandbyCustomerId(userId).subscribe(
    //   myData => {
    //     // this.orderList = myData;
    //   },
    //   myErr => { console.log(myErr.message); });
    // console.log(this.orderList);
  }

  removeItem(orderID:number)
  {
   this.orderSer.deleteOrder(orderID).subscribe(myData=>
    {
      this.ComputerListWithDate=new Array();
        this.orderList = myData;
        for(let i=0;i<this.orderList.length;i++)
       { let c=this.compSer.list.find(c=>c.Id=this.orderList[i].ProudactId)
        let tOrF=true
        if(new Date(this.orderList[i].ToDate).getTime()<new Date(this.today).getTime())
        tOrF=true
        else
        tOrF=false
       this.ComputerListWithDate.push(new ComputerWithProgramWithDate(c.Id,c.LepTopId,c.CompanyId,c.CompanyName,c.ComputerImg,c.Type,c.Prossess,c.Memory,c.HardDisk,c.ScreenSize,c.ComputerImg,c.Programslist,this.orderList[i].FromDate,this.orderList[i].ToDate,this.orderList[i].Id,tOrF));
      }
      this.sortByDueDate(  this.ComputerListWithDate)
        this.dataSource=new MatTableDataSource<ComputerWithProgramWithDate>(this.ComputerListWithDate);
        this.dataSource.paginator = this.paginator;
    
    })
  }
  

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  IschangDate=false;
  changeDateFormat:string;
  changeDateOrderId;
  changeDateComputerId;
  changeDateDateFrom:Date;
  changeDate(orderID:number)
  {
  this.IschangDate=true;
  this.changeDateFormat= new Date(this.orderList.find(ed=>ed.Id==orderID).ToDate).toDateString();
  this.changeDateOrderId=orderID;
  this.changeDateComputerId=this.orderList.find(ed=>ed.Id==orderID).ProudactId;
  this.changeDateDateFrom=this.orderList.find(ed=>ed.Id==orderID).FromDate;
}

  okChangeDate()
  {
    this.orderSer.ChackOorderDate(new Date(this.changeDateDateFrom).toDateString(),new Date(this.changeDateFormat).toDateString()).subscribe(
      myData =>
      {
        if(myData.find(c=>c.Id==this.changeDateComputerId)==null)
      {
        alert("התאריך השתנה בהצלחה!!")
      }
      else
      {
        let changeOrder=this.orderList.find(o=>o.Id==this.changeDateOrderId);
        changeOrder.ToDate=new Date(this.changeDateFormat);
        this.orderSer.UpdateOrders(changeOrder).subscribe(myData=>
          {
            this.ComputerListWithDate=new Array();
            this.orderList = myData;
            for(let i=0;i<this.orderList.length;i++)
           { let c=this.compSer.list.find(c=>c.Id=this.orderList[i].ProudactId)
            
            let tOrF=true
            if(new Date(this.orderList[i].ToDate).getTime()<new Date(this.today).getTime())
            tOrF=true
            else
            tOrF=false
           this.ComputerListWithDate.push(new ComputerWithProgramWithDate(c.Id,c.LepTopId,c.CompanyId,c.CompanyName,c.ComputerImg,c.Type,c.Prossess,c.Memory,c.HardDisk,c.ScreenSize,c.ComputerImg,c.Programslist,this.orderList[i].FromDate,this.orderList[i].ToDate,this.orderList[i].Id,tOrF));
          }
        this.sortByDueDate(this.ComputerListWithDate)
            this.dataSource=new MatTableDataSource<ComputerWithProgramWithDate>(this.ComputerListWithDate);
            this.dataSource.paginator = this.paginator;
         this. cancleChangeDate()
          })
      }
    })
  }

  cancleChangeDate()
  {
    this.changeDateOrderId=0;
    this.IschangDate=false;
    this.changeDateFormat="";
  }

  sortByDueDate(myArray: ComputerWithProgramWithDate[]): void {
    myArray.sort((a: ComputerWithProgramWithDate, b: ComputerWithProgramWithDate) => {
      return new Date(a.dateE).getTime() - new Date(b.dateE).getTime();
    });
  }
}

