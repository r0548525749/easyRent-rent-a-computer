import { Component, OnInit, Inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SoftwaresService } from 'src/app/Services/softwares.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { DatachangeComponent } from '../datachange/datachange.component';
import { OrderService } from 'src/app/Services/order.service';
import { Time } from '@angular/common';
import { LogoComponent } from 'ng-uikit-pro-standard';
import { Order } from 'src/app/Classes/Order';
import { CustomeresService } from 'src/app/Services/customeres.service';
import * as moment from 'moment';


@Component({
  selector: 'app-date-and-time-popup',
  templateUrl: './date-and-time-popup.component.html',
  styleUrls: ['./date-and-time-popup.component.css']
})
export class DateAndTimePopupComponent implements OnInit {
  date = new FormControl(moment([2017, 0, 1]));
  dataSource = null;
  dataSourceQ = null;
  dataSourceO = null;
  check: number = 0;
  submitted = false;
  hide = true;
  @Input() parentData;
  dataFromManager: any;
  fromDate: Date;
  toDate: Date;
  starttime: Time;
  endtime: Time;
  aa: string[]
  range: FormGroup;

  constructor(
    private customerSer: CustomeresService,
    private orderSer: OrderService,
    public matdialog: MatDialogRef<DatachangeComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  selectedDate: any
  ngOnInit() {
    this.initForm();
    this.listStartHour = new Array();
    this.listEndHour = new Array();
    this.startHours = new Array();
    this.endHours = new Array();
    this.fillHours(this.startHours);
    this.fillHours(this.endHours);
    for (let i = 8; i <= 20; i++) {

      this.listStartHour.push(new hourDay(i, false))
      this.listEndHour.push(new hourDay(i, false))
    }
   // this.startDate = new Date(this.data.startDate)
  }

  initForm() {
    debugger
    this.range = this.fb.group({
      startDate: [new Date(this.data.startDate)],
      endDate: [new Date(this.data.endDate)]
      // startDate:new FormControl(),
      // endDate: new FormControl()
    });
  }

  get startDate() {
    if (this.range.get('startDate')) {
      return this.range.get('startDate').value;
    } else {
      return null;
    }
  }
  get endDate() {
    if (this.range.get('endDate')) {
      return this.range.get('endDate').value;
    } else {
      return null;
    }
  }

  fillHours(h) {
    h.push(new selectHour("08:00", 8))
    h.push(new selectHour("09:00", 9))
    h.push(new selectHour("10:00", 10))
    h.push(new selectHour("11:00", 11))
    h.push(new selectHour("12:00", 12))
    h.push(new selectHour("13:00", 13))
    h.push(new selectHour("14:00", 14))
    h.push(new selectHour("15:00", 15))
    h.push(new selectHour("16:00", 16))
    h.push(new selectHour("17:00", 17))
    h.push(new selectHour("18:00", 18))
    h.push(new selectHour("19:00", 19))
    h.push(new selectHour("20:00", 20))

  }
  currentOrder: Order;
  CheckDate1() {
    debugger
    this.currentOrder = new Order(0, this.range.get('startDate').value, this.range.get('endDate').value, this.data.comp.Id, 152, 126, "16:00:00", "16:00:00", this.customerSer.CurrentCustomer.Id);
    this.orderSer.AddOrders(this.currentOrder).subscribe(myData => {
      this.onCloase()
    }, err => { });
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }
  onCloase() {
    this.submitted = false;
    this.matdialog.close();
  }
  onReset() {
    this.submitted = false;
    this.fromDate;
  }
  showErrMsg: boolean = false;
  errMsg: string
  checkStartDate(st: any) {
    debugger
    this.showErrMsg = false;
    this.startHours = new Array();
    this.fillHours(this.startHours)
    let to = new Date();
    if (new Date(this.startDate).setHours(0) < new Date(to).setHours(0, 0, 0, 0)) {
      this.range.get('startDate').reset();
      st.focus();
      this.errMsg = "תאריך לא יכול להיות קטן מהיום"
      this.showErrMsg = true
    }
    let chD = this.data.comp.ListStatus.find(c => (new Date(c.date).getDate() == this.startDate.getDate() && new Date(c.date).getMonth() == this.startDate.getMonth() && new Date(c.date).getFullYear() == this.startDate.getFullYear()))
    if (chD != null) {
      if (chD.status == 3) {
        for (let j = 0; j < this.listStartHour.length; j++)
          this.listStartHour[j].status = true;
        this.range.get('startDate').reset();
        st.focus();
        this.errMsg = "תאריך זה תפוס"
        this.showErrMsg = true
      }
      else {
        let listDate = this.data.comp.OrdersDate.filter(c => (new Date(c.FromDate).getDate() == this.startDate.getDate() && new Date(c.FromDate).getMonth() == this.startDate.getMonth() && new Date(c.FromDate).getFullYear() == this.startDate.getFullYear()) || (new Date(c.ToDate).getDate() == this.startDate.getDate() && new Date(c.ToDate).getMonth() == this.startDate.getMonth() && new Date(c.ToDate).getFullYear() == this.startDate.getFullYear()))
        if (listDate != null) {
          for (let i = 0; i < listDate.length; i++)
            if (new Date(listDate[i].FromDate).getDate() == new Date(listDate[i].ToDate).getDate() && new Date(listDate[i].FromDate).getMonth() == new Date(listDate[i].ToDate).getMonth() && new Date(listDate[i].FromDate).getFullYear() == new Date(listDate[i].ToDate).getFullYear()) {

              console.log("j= ", new Date(listDate[i].FromDate).getHours());
              console.log("j< ", new Date(listDate[i].ToDate).getHours());

              for (let j = new Date(listDate[i].FromDate).getHours(); j < new Date(listDate[i].ToDate).getHours(); j++) {
                console.log("j ++", j);
                this.listStartHour[this.listStartHour.findIndex(h1 => h1.hour == j)].status = true;
              }
            }
            else {
              if (new Date(listDate[i].FromDate).getDate() == this.startDate.getDate() && new Date(listDate[i].FromDate).getMonth() == this.startDate.getMonth() && new Date(listDate[i].FromDate).getFullYear() == this.startDate.getFullYear()) {
                for (let j = new Date(listDate[i].FromDate).getHours(); j <= 20; j++)
                  this.listStartHour[this.listStartHour.findIndex(h1 => h1.hour == j)].status = true;
                //מהFROMDATE עד 20 בערב
              }
              else {
                for (let j1 = 8; j1 < new Date(listDate[i].ToDate).getHours(); j1++) { this.listStartHour[this.listStartHour.findIndex(h1 => h1.hour == j1)].status = true; }
                //מ8 בבוקר עד TODATE
              }
            }
        }
      }
      for (let j = 0; j < this.listStartHour.length; j++)
        if (this.listStartHour[j].status == true)
          this.startHours = this.startHours.filter(f => f.numHour != this.listStartHour[j].hour)
    }
  }
  today: Date;
  checkEndDate(eh: any) {
    debugger
    this.endHours = new Array();
    this.fillHours(this.endHours)
    if (this.startDate > this.endDate) {
      this.range.get('endDate').reset();
      eh.focus();
      this.errMsg = "תאריך לא יכול להיות קטן מתאריך ההתחלה"
      this.showErrMsg = true
      return
    }
    if (this.startDate.toString() != this.endDate.toString()) {
      let arrDate = this.data.comp.ListStatus.filter(c => new Date(c.date) <= this.endDate && new Date(c.date) >= this.startDate)
      if (arrDate != null && arrDate.length > 0) {
        this.range.get('endDate').setValue(arrDate[0].date);
        let a
        if (arrDate[0].status == 3) {
          a = new Date(this.endDate).setDate(new Date(this.endDate).getDate() - 1);
          this.range.get('endDate').setValue(new Date(a));
        }
      }
    }

    let chD = this.data.comp.ListStatus.find(c => (new Date(c.date).getDate() == new Date(this.endDate).getDate() && new Date(c.date).getMonth() == new Date(this.endDate).getMonth() && new Date(c.date).getFullYear() == new Date(this.endDate).getFullYear()))

    if (chD != null) {
      if (chD.status == 3) {
        for (let j = 0; j < this.listEndHour.length; j++)
          this.listEndHour[j].status = true;
        this.range.get('endDate').reset();
        eh.focus();
        this.errMsg = "תאריך זה תפוס"
        this.showErrMsg = true
      }
      else {
        let listDate = this.data.comp.OrdersDate.filter(c => (new Date(c.FromDate).getDate() == new Date(this.endDate).getDate() && new Date(c.FromDate).getMonth() == new Date(this.startDate).getMonth() && new Date(c.FromDate).getFullYear() == new Date(this.startDate).getFullYear()) || (new Date(c.ToDate).getDate() == new Date(this.startDate).getDate() && new Date(c.ToDate).getMonth() == this.endDate.getMonth() && new Date(c.ToDate).getFullYear() == new Date(this.endDate).getFullYear()))
        if (listDate != null) {
          for (let i = 0; i < listDate.length; i++)
            if (new Date(listDate[i].FromDate).getDate() == new Date(listDate[i].ToDate).getDate() && new Date(listDate[i].FromDate).getMonth() == new Date(listDate[i].ToDate).getMonth() && new Date(listDate[i].FromDate).getFullYear() == new Date(listDate[i].ToDate).getFullYear()) {
              for (let j = new Date(listDate[i].FromDate).getHours(); j < new Date(listDate[i].ToDate).getHours(); j++)
                this.listEndHour[this.listEndHour.findIndex(h1 => h1.hour == j)].status = true;
            }
            else {
              if (new Date(listDate[i].FromDate).getDate() == this.startDate.getDate() && new Date(listDate[i].FromDate).getMonth() == this.startDate.getMonth() && new Date(listDate[i].FromDate).getFullYear() == this.startDate.getFullYear()) {
                for (let j = new Date(listDate[i].FromDate).getHours(); j <= 20; j++)
                  this.listEndHour[this.listEndHour.findIndex(h1 => h1.hour == j)].status = true;
                //מהFROMDATE עד 20 בערב
              }
              else {
                for (let j1 = 8; j1 < new Date(listDate[i].ToDate).getHours(); j1++) { this.listEndHour[this.listEndHour.findIndex(h1 => h1.hour == j1)].status = true; }
                //מ8 בבוקר עד TODATE
              }
            }
        }
      }
      for (let j = 0; j < this.listEndHour.length; j++)
        if (this.listEndHour[j].status == true)
          this.endHours = this.endHours.filter(f => f.numHour != this.listEndHour[j].hour)
    }
  }
  sh: number
  checkstartHour(event) {
    debugger
    this.endHours = new Array()
    this.fillHours(this.endHours)
    new Date(this.startDate).setHours(0)
    if (new Date(this.startDate).getDate() == new Date(this.endDate).getDate()) {
      this.endHours = this.endHours.filter(f => f.numHour > event.value)
      for (let j = 0; j < this.listEndHour.length; j++)
        if (this.listEndHour[j].status == true && this.listEndHour[j].hour > event.value)
          this.endHours = this.endHours.filter(f => f.numHour <= this.listEndHour[j].hour && f.numHour >= event.value)
    }
    else {
      for (let j = 0; j < this.listEndHour.length; j++) {
        if (this.listEndHour[2].status == true)
          this.endHours = this.endHours.filter(f => f.numHour <= this.listEndHour[2].hour)
        break;
      }
    }
    this.startDate.setHours(event.value + 2);
    console.log("startDate", this.startDate);
  }
  eh1: number;
  checkendtHour(event) {
   this.endDate.setHours(event.value + 2);
    console.log("endDate", this.endDate);

  }
  listStartHour: hourDay[];
  listEndHour: hourDay[];
  startHours: selectHour[];
  endHours: selectHour[];

}
export class selectHour {
  constructor(public formatHour: string, public numHour) { }
}
export class hourDay {
  constructor(public hour: number, public status: boolean) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    // this.dataSourceQ.filter = filterValue.trim().valueOf();
    // this.dataSourceO.filter = filterValue.trim().valueOf();
  }
}