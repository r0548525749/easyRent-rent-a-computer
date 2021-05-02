import { Component, OnInit, ViewChild } from '@angular/core';
import { SoftwaresService } from 'src/app/Services/softwares.service';
import { ActivatedRoute } from '@angular/router';
import { Software } from 'src/app/Classes/software';
import { Members } from 'src/app/Classes/Members';
import { MemberService } from 'src/app/Services/member.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProgramesService } from 'src/app/Services/programes.service';
import { Program } from 'src/app/Classes/program';
import { Versiones } from 'src/app/Classes/versiones';
import { VersionesService } from 'src/app/Services/versiones.service';
import { ShoppingBagService } from 'src/app/Services/shopping-bag.service';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogConfig, MatDialog, MatCalendarCellCssClasses } from '@angular/material';
import { DatachangeComponent } from '../datachange/datachange.component';
import { PopupDateComponent } from '../popup-date/popup-date.component';
import { ComputerWithProgram } from 'src/app/Classes/computer-with-program';
import { ComputerWithProgramService } from 'src/app/Services/computer-with-program.service';
import { Softwer2 } from 'src/app/Classes/softwer2';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/Classes/product';
import { CustomeresService } from 'src/app/Services/customeres.service';
import { OrderService } from 'src/app/Services/order.service';
import { IMyOptions } from 'ng-uikit-pro-standard';
import { DateAndTimePopupComponent } from '../date-and-time-popup/date-and-time-popup.component';
import { R3DirectiveMetadataFacade } from '@angular/compiler/src/compiler_facade_interface';
import { statusDate } from 'src/app/Classes/ststusDate';
import { Order } from 'src/app/Classes/Order';
import { listJewishDate } from 'src/app/Classes/JewishDate';
import { listErevChag } from 'src/app/Classes/JewishDate';

// import { networkInterfaces } from 'os';
// import { DateAdapter } from '@angular/material/core';

export interface Name {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-view-computer',
  templateUrl: './view-computer.component.html',
  styleUrls: ['./view-computer.component.css']
})

export class ViewComputerComponent implements OnInit {
  memberList: Array<Members>;
  Software: Software;
  softwareList: Array<Software>;
  product: Product;
  productList: Array<Product>;
  currsoftware: Software;
  programList: Array<Program>;
  versionsList: Array<Versiones>;
  computerWithProgramList: Array<ComputerWithProgram>;
  computerWithProgramListFilter: Array<ComputerWithProgram>;
  Softwer2List: Array<Softwer2>;
  computerWithProgram: ComputerWithProgram;
  isEdit: boolean = false;
  selectedValue: string;
  selectedVersion: string;
  selectedPrice: string;
  selectedMemory: string;
  selectedType: string;
  selectedProcess: string;
  selectedCompany: string;
  selectedHardDisk: string;
  selectedScreanSize: string;
  name: string;
  id: number;
  version: number;
  comment: string;
  bagSoftwer: Array<ComputerWithProgram> = new Array<ComputerWithProgram>();
  count: number = 0;
  i: Number = 0;
  index: any;
  toppings = new FormControl();
  shwoButton1: boolean = true;
  shwoButton2: boolean = false;
  n1: Date;
  showFiller = false;
  // fromDate=new FormControl();
  // toDate=new FormControl();
  memmoryList;
  typeList;
  processList;
  companyList;
  hardDiskList;
  screanSizeList;
  // formBuilder: FormBuilder;
  // dateForm: FormGroup;
  fromDate: Date;
  toDate: Date;
  form: FormGroup;
  events: string[] = [];
  opened: boolean;
  showFilter: boolean = false;
  computerWithProgramD: Array<ComputerWithProgramD> = new Array();
  // shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  constructor(
    private activatedRoute: ActivatedRoute,
    private softwareSer: SoftwaresService,
    private memberser: MemberService,
    private programser: ProgramesService,
    private versionser: VersionesService,
    private shoppingBagSer: ShoppingBagService,
    private dialog: MatDialog,
    private computerWithProgramSer: ComputerWithProgramService,
    private ProductSer: ProductService,
    private customerSer: CustomeresService,
    private formBuilder: FormBuilder,
    private orderSer: OrderService) { }


  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  getData: boolean;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  ngOnInit() {
    // this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
    this.initForm();
    this.customerSer.CheckUserExist()
    // this.fromDate=new FormControl();
    // this.toDate=new FormControl();
    this.initSer();
    this.getData = true;
    this.softwareSer.GetSoftwares().subscribe(
      myData => {
        this.getData = false;

        //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
        this.softwareList = myData;
        console.log("computers", myData);
      },
      myErr => { console.log(myErr.message); });

    this.ProductSer.GetProduct().subscribe(
      myData => {
        //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
        this.productList = myData;
      },
      myErr => { console.log(myErr.message); });

    this.memberser.GetMembers().subscribe(
      myData => {
        //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
        this.memberList = myData;
      },
      myErr => { console.log(myErr.message); });

    this.programser.GetPrograms().subscribe(
      myData => {
        //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
        this.programList = myData;
      },
      myErr => { console.log(myErr.message); });
    this.versionser.GetVersioners().subscribe(
      myData => {
        //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
        this.versionsList = myData;
      },
      myErr => { console.log(myErr.message); });
  }

  initSer() {
    this.computerWithProgramSer.GetComputers().subscribe(
      myData => {
        console.log(myData)
        //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
        this.computerWithProgramList = myData;
        this.computerWithProgramSer.list=myData;
        this.computerWithProgramListFilter = myData;
        var i = 0;
        this.colorCalander()

        this.computerWithProgramListFilter.forEach(element => {
          this.computerWithProgramD.push(new ComputerWithProgramD(element, false))

        });
        this.memmoryList = this.getMemmory();
        this.typeList = this.getType();
        this.processList = this.getProcess();
        this.companyList = this.getCompany();
        this.hardDiskList = this.gethardDisk();
        this.screanSizeList = this.getScreanSize();
      },
      myErr => { console.log(myErr.message); });
  }

  initForm() {
    this.form = this.formBuilder.group({
      fromDate2: [''],
      toDate2: ['']
    })
  }

  CheckDate1() {
    alert(this.n1);
    alert(this.range.value.start);
    alert(this.range.value.end);
    this.orderSer.ChackOorderDate(new Date(this.range.value.start).toDateString(), new Date(this.range.value.end).toDateString()).subscribe(data => this.computerWithProgramListFilter = data);
    // alert("from:" + this.fromDate + ", to:" + this.toDate)
  }

  filter(name: string) {
    this.softwareSer.FilteringByName(name).subscribe(
      myData => {
        //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
        this.softwareList = myData;
      },
      myErr => { console.log(myErr.message); });
  }

  AddToBag(soft: ComputerWithProgram) {
    this.bagSoftwer.push(soft);
    this.shoppingBagSer.shoppingBag.push(soft);
    this.count++;
    console.log("This id is added" + this.bagSoftwer.find(c => c.Id == soft.Id).Id);
    console.log(this.count);
  }

  DeleteFromBag(soft1: ComputerWithProgram) {
    this.index = this.bagSoftwer.findIndex(c => c.Id == soft1.Id);
    if (this.index != -1) {
      this.bagSoftwer.splice(this.index, 1);
      this.count--;
      console.log(this.count);
    }
    this.index = this.shoppingBagSer.shoppingBag.findIndex(c => c.Id == soft1.Id);
    if (this.index != -1) {
      this.shoppingBagSer.shoppingBag.splice(this.index, 1);
      this.count--;
      console.log(this.count);
    }
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  date1: statusDate
  dateClass(c: ComputerWithProgram) {

    return (date: Date): MatCalendarCellCssClasses => {
      {
        if(new Date(date).getDay()==6 ||null!=listJewishDate.find(d=>d.date.getDate()==new Date(date).getDate() &&d.date.getMonth()==new Date(date).getMonth() && d.date.getFullYear()==new Date(date).getFullYear() ))
        {
          return 'dateClaasDisable';
        }
        if (c.ListStatus != null && c.ListStatus.length > 0) {
          this.date1 = c.ListStatus.find(e => date.getDate() == new Date(e.date).getDate() && date.getMonth() == new Date(e.date).getMonth() && date.getFullYear() == new Date(e.date).getFullYear())
          if (this.date1 != null) {
            if (this.date1.status == 2) {
              return 'dateClaas2';
            }
            else if (this.date1.status == 3) {
              return 'dateClaas1';
            }
          }
        }
      }
    }
    return
  }

  // dateClass = (d: Date): MatCalendarCellCssClasses => {
  //   const date = d.getDate();
  //   // Highlight the 1st and 20th day of each month.
  //   return (date === 1 || date === 20) ? 'dateClass1' : 'dateClass2';
  // }

  getMemmory() {
    let memmory = [];
    this.computerWithProgramList.forEach(function (element) {
      if (!memmory.includes(element.Memory) && element.Memory != null) {
        memmory.push(element.Memory);
      }
    });
    return memmory;
  }

  getType() {
    let type = [];
    this.computerWithProgramList.forEach(function (element) {
      if (!type.includes(element.Type) && element.Type != null) {
        type.push(element.Type);
      }
    });
    console.log(type);
    return type;
  }

  getProcess() {
    let process = [];
    this.computerWithProgramList.forEach(function (element) {
      if (!process.includes(element.Prossess) && element.Prossess != null) {
        process.push(element.Prossess);
      }
    });
    console.log(process);
    return process;
  }

  getCompany() {
    let Company = [];
    this.computerWithProgramList.forEach(function (element) {
      if (!Company.includes(element.CompanyName) && element.CompanyName != null) {
        Company.push(element.CompanyName);
      }
    });
    return Company;
  }

  gethardDisk() {
    let HardDisk = [];
    this.computerWithProgramList.forEach(function (element) {
      if (!HardDisk.includes(element.HardDisk) && element.HardDisk != null) {
        HardDisk.push(element.HardDisk);
      }
    });
    return HardDisk;
  }

  getScreanSize() {
    let ScreanSize = [];
    this.computerWithProgramList.forEach(function (element) {
      if (!ScreanSize.includes(element.ScreenSize) && element.ScreenSize != null) {
        ScreanSize.push(element.ScreenSize);
      }
    });
    return ScreanSize;
  }

  filterByProgramName(selectedValue) {
    this.computerWithProgramListFilter = [];
    this.computerWithProgramList.forEach(element => {
      if (element.Programslist != null) {
        let programNames = element.Programslist.map(x => x.ProgramName);
        let flag = false;
        selectedValue.forEach(value => {
          if (!programNames.includes(value)) {
            flag = true;
          }
        });
        if (flag == false) {
          this.computerWithProgramListFilter.push(element);
        }
      }
    });
  }
  date2: statusDate;
  dateFilter(c: any) {
    return (date: Date) => {
      if (c.ListStatus != null && c.ListStatus.length > 0) {
        this.date2 = c.ListStatus.find(e => date.getDate() == new Date(e.date).getDate() && date.getMonth() == new Date(e.date).getMonth() && date.getFullYear() == new Date(e.date).getFullYear())
        if (this.date2 != null) {
          if (this.date2.status == 3) {
            return 0;
          }
        }

      }
      return 1;
    }
  }

  create(c: any) {
    if (this.startDate != null) {
      const DialogConfig = new MatDialogConfig();
      DialogConfig.disableClose = true;
      DialogConfig.autoFocus = true;
      DialogConfig.width = "60%";
      DialogConfig.data = { name: new Software(), startDate: String, comp: ComputerWithProgram };
      DialogConfig.data.startDate = this.startDate;
      this.startDate = null
      DialogConfig.data.comp = c;
      const dialogRef = this.dialog.open(DateAndTimePopupComponent, DialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        this.initSer();
        console.log(result);
      });
    }
  }

  startDate: string
  getDay(event: Date) {
    this.startDate = event.toDateString();
  }

  //curComp: ComputerWithProgram;
  colorCalander() {

    for (let k = 0; k < this.computerWithProgramListFilter.length; k++)
      if (this.computerWithProgramListFilter[k].OrdersDate != null && this.computerWithProgramListFilter[k].OrdersDate.length > 0) {
        this.sortByDueDate(this.computerWithProgramListFilter[k].OrdersDate);
        this.computerWithProgramListFilter[k].ListStatus = new Array();
        this.createListDate(this.computerWithProgramListFilter[k].ListStatus, this.computerWithProgramListFilter[k]);
      }
  }

  sortByDueDate(myArray: Order[]): void {
    console.log("start sortByDueDate");
    myArray.sort((a: Order, b: Order) => {
      return new Date(a.FromDate).getTime() - new Date(b.FromDate).getTime();
    });
  }
stopHour:number
sumHours:number;
  //  בדיקות תקינות של תאריכים
  createListDate(ListStatusDate: statusDate[], curComp: ComputerWithProgram) {
    let sum = 0;
    ListStatusDate.push(new statusDate(curComp.OrdersDate[0].FromDate, 3))
    let ezerDate = curComp.OrdersDate[0].FromDate
    if ((new Date(ezerDate).getDate() != new Date(curComp.OrdersDate[0].ToDate).getDate()) || (new Date(ezerDate).getMonth() != new Date(curComp.OrdersDate[0].ToDate).getMonth()) || (new Date(ezerDate).getFullYear() != new Date(curComp.OrdersDate[0].ToDate).getFullYear())) {

      if (sum < 12 && sum != 0)
        ListStatusDate[ListStatusDate.length - 1].status = 2;
        if(new Date(curComp.OrdersDate[0].FromDate).getDay()==5 || listErevChag.find(d=>new Date(d.date)==new Date(curComp.OrdersDate[0].FromDate)))
      {  this.stopHour=12;
        this.sumHours=4
      }
        else
        {  this.stopHour=20;
          this.sumHours=12
        }
      sum = 0;     
      sum = Math.abs((new Date(0, 0, 0,  this.stopHour, 0).getHours() + new Date(0, 0, 0,  this.stopHour, 0).getMinutes() / 60) - (new Date(curComp.OrdersDate[0].FromDate).getHours() + new Date(curComp.OrdersDate[0].FromDate).getMinutes() / 60))
      console.log(sum);
      if (sum < this.sumHours&& sum != 0)
        ListStatusDate[ListStatusDate.length - 1].status = 2;
      while ((new Date(ezerDate).getDate() != new Date(curComp.OrdersDate[0].ToDate).getDate()) || (new Date(ezerDate).getMonth() != new Date(curComp.OrdersDate[0].ToDate).getMonth()) || (new Date(ezerDate).getFullYear() != new Date(curComp.OrdersDate[0].ToDate).getFullYear())) {

        ezerDate = new Date(ezerDate);
        ezerDate.setDate(ezerDate.getDate() + 1)
        ListStatusDate.push(new statusDate(ezerDate, 3))
      }
      // if (sum < 12 && sum != 0)
      //  ListStatusDate[this.ListStatusDate.length - 1].status = 2;
      sum = Math.abs((new Date(0, 0, 0, 8, 0).getHours() + new Date(0, 0, 0, 8, 0).getMinutes() / 60) - (new Date(curComp.OrdersDate[0].ToDate).getHours() + new Date(curComp.OrdersDate[0].ToDate).getMinutes() / 60))
      console.log(sum);
    }
    else {
      sum += Math.abs((new Date(curComp.OrdersDate[0].FromDate).getHours() + new Date(curComp.OrdersDate[0].FromDate).getMinutes() / 60) - (new Date(curComp.OrdersDate[0].ToDate).getHours() + new Date(curComp.OrdersDate[0].ToDate).getMinutes() / 60))
      console.log(sum);
    }
    for (let i = 1; i < curComp.OrdersDate.length; i++) {
      if ((new Date(ListStatusDate[ListStatusDate.length - 1].date).getDate() != new Date(curComp.OrdersDate[i].FromDate).getDate()) || (new Date(ListStatusDate[ListStatusDate.length - 1].date).getMonth() != new Date(curComp.OrdersDate[i].FromDate).getMonth()) || (new Date(ListStatusDate[ListStatusDate.length - 1].date).getFullYear() != new Date(curComp.OrdersDate[i].FromDate).getFullYear())) {
        if(new Date(curComp.OrdersDate[i].FromDate).getDay()==5|| listErevChag.find(d=>new Date(d.date)==new Date(curComp.OrdersDate[0].FromDate)))
        {  this.stopHour=12;
          this.sumHours=4
        }
          else
          {  this.stopHour=20;
            this.sumHours=12
          }
        if (sum < this.sumHours && sum != 0)
          ListStatusDate[ListStatusDate.length - 1].status = 2;
        sum = 0;
        sum = Math.abs((new Date(0, 0, 0, this.stopHour, 0).getHours() + new Date(0, 0, 0, this.stopHour, 0).getMinutes() / 60) - (new Date(curComp.OrdersDate[i].FromDate).getHours() + new Date(curComp.OrdersDate[i].FromDate).getMinutes() / 60))
        console.log(sum);
        ListStatusDate.push(new statusDate(curComp.OrdersDate[i].FromDate, 3))
      }

      else {
        sum += Math.abs((new Date(curComp.OrdersDate[i].FromDate).getHours() + new Date(curComp.OrdersDate[i].FromDate).getMinutes() / 60) - (new Date(curComp.OrdersDate[i].ToDate).getHours() + new Date(curComp.OrdersDate[i].ToDate).getMinutes() / 60))
        console.log(sum);
      }

      ezerDate = curComp.OrdersDate[i].FromDate
      if(new Date(curComp.OrdersDate[i].FromDate).getDay()==5 || listErevChag.find(d=>new Date(d.date)==new Date(curComp.OrdersDate[0].FromDate)))
      {  this.stopHour=12;
        this.sumHours=4
      }
        else
        {  this.stopHour=20;
          this.sumHours=12
        }
      if (new Date(ezerDate).getDate() != new Date(curComp.OrdersDate[i].ToDate).getDate() || new Date(ezerDate).getMonth() != new Date(curComp.OrdersDate[i].ToDate).getMonth() || new Date(ezerDate).getFullYear() != new Date(curComp.OrdersDate[i].ToDate).getFullYear()) {
        {

          while (new Date(ezerDate).getDate() != new Date(curComp.OrdersDate[i].ToDate).getDate() || new Date(ezerDate).getMonth() != new Date(curComp.OrdersDate[i].ToDate).getMonth() || new Date(ezerDate).getFullYear() != new Date(curComp.OrdersDate[i].ToDate).getFullYear()) {
            ezerDate = new Date(ezerDate);
            ezerDate.setDate(ezerDate.getDate() + 1)
            ListStatusDate.push(new statusDate(ezerDate, 3))
          }

          sum = Math.abs((new Date(0, 0, 0, 8, 0).getHours() + new Date(0, 0, 0, 8, 0).getMinutes() / 60) - (new Date(curComp.OrdersDate[i].ToDate).getHours() + new Date(curComp.OrdersDate[i].ToDate).getMinutes() / 60))
          console.log(sum);
        }
        if(new Date(curComp.OrdersDate[i].ToDate).getDay()==5||listErevChag.find(d=>new Date(d.date)==new Date(curComp.OrdersDate[0].FromDate)))
        {  this.stopHour=12;
          this.sumHours=4
        }
          else
          {  this.stopHour=20;
            this.sumHours=12
          }
        if (sum < this.sumHours && sum != 0)
          ListStatusDate[ListStatusDate.length - 1].status = 2;
      }
      if (sum <this.sumHours && sum != 0)
        ListStatusDate[ListStatusDate.length - 1].status = 2;
      else
        if (sum == this.sumHours)
          ListStatusDate[ListStatusDate.length - 1].status = 3;
    }
    if (sum < this.sumHours && sum != 0)
      ListStatusDate[ListStatusDate.length - 1].status = 2;
    if (sum == this.sumHours)
      ListStatusDate[ListStatusDate.length - 1].status = 3;

    for (let x = 0; x < ListStatusDate.length; x++)
      console.log(ListStatusDate[x].date, " ", ListStatusDate[x].status);
  }
}

export class ComputerWithProgramD {
  constructor(
    public computer: ComputerWithProgram,
    public date: boolean) { }
}
