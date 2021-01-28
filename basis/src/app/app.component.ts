import { Component, DoCheck, OnInit } from '@angular/core'; import { ToastrService } from 'ngx-toastr';
import { CompanyService } from './Services/company.service';
import { CustomeresService } from './Services/customeres.service';
import { TypeCompuetService } from './Services/type.service';

// import 'jarallax';
// declare var jarallax: any;
// import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit ,DoCheck{
  messages: string;
  title = 'g';
  connected: boolean = false;

  constructor(private toastr: ToastrService, private customerSer: CustomeresService, private CompanySer:CompanyService,
    private TypeSer:TypeCompuetService,) {
    debugger
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

 

  ngDoCheck()
  {
    if (this.customerSer.CurrentCustomer != undefined)
      this.connected = true;
  }
  // showSuccess() {
  //   this.toastr.success('Hello world!', 'Toastr fun!');
  // }
  // ngAfterViewInit() {
  //   jarallax(document.querySelectorAll('.jarallax'), {
  //     speed: 0.2
  //   });
  // }
  // Display an info toast with no title
  talk() {
    this.messages = "ggggggggggggg";
  }

ListDate: objDate[];
//ListStatusDate: statusDate[];
ngOnInit(): void {


  // this.ListStatusDate = new Array();
  // this.ListDate = new Array();
  // this.ListDate.push(new objDate(1, new Date("2016-05-15 8:00"), new Date("2016-05-15 20:30")));

  // this.ListDate.push(new objDate(1, new Date("2016-05-15 18:30"), new Date("2016-05-15 19:30")));
  // this.ListDate.push(new objDate(1, new Date("2016-05-16 8:30"), new Date("2016-05-18 14:00")));
  // this.ListDate.push(new objDate(1, new Date("2016-05-18 16:30"), new Date("2016-05-18 19:30")));
  // console.log(this.ListDate[0].toDate.getTime() - this.ListDate[0].fromDate.getTime());
  // this.createListDate()
}

// createListDate() {
//   this.ListStatusDate=new Array();
//   debugger
//   let y=1
//   this.ListStatusDate.push(new statusDate(this.ListDate[0].fromDate, 3))
//   let ezerDate = this.ListDate[0].fromDate
//   if (ezerDate.getDate() != this.ListDate[0].toDate.getDate())
//     while (ezerDate.getDate() != this.ListDate[0].toDate.getDate()) {
//       ezerDate =new Date( ezerDate);
//       ezerDate.setDate(ezerDate.getDate()+1)
//       this.ListStatusDate.push(new statusDate(ezerDate, 3))
//     }
//   for (let i = 1; i < this.ListDate.length; i++) {
// if(this.ListStatusDate[this.ListStatusDate.length-1].date.getDate()!=this.ListDate[i].fromDate.getDate())
// {
// this.ListStatusDate.push(new statusDate(this.ListDate[i].fromDate, 3))
// ezerDate = this.ListDate[i].fromDate
//   if (ezerDate.getDate() != this.ListDate[i].toDate.getDate())
//   {

//     while (ezerDate.getDate() != this.ListDate[i].toDate.getDate()) {
//       ezerDate =new Date( ezerDate);
//       ezerDate.setDate(ezerDate.getDate()+1)
//       this.ListStatusDate.push(new statusDate(ezerDate, 3))
//     }}

// }
//   }
//   for(let x=0; x<this.ListStatusDate.length;x++)
//   console.log(this.ListStatusDate[x].date);

// }
}






export class objDate {
constructor(public id: number, public fromDate: Date, public toDate: Date) { }

}
