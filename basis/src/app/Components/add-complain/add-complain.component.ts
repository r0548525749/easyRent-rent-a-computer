import { Component, OnInit } from '@angular/core';
import { Complaint } from 'src/app/Classes/complaint';
import { ActivatedRoute } from '@angular/router';
import { ComplaintsService } from 'src/app/Services/complaints.service';
import { FormGroup } from '@angular/forms';
import { CustomeresService } from 'src/app/Services/customeres.service';
import { Computer } from 'src/app/Classes/computer';
import { ComputerWithProgramService } from 'src/app/Services/computer-with-program.service';
import { ComputerWithProgram } from 'src/app/Classes/computer-with-program';

@Component({
  selector: 'app-add-complain',
  templateUrl: './add-complain.component.html',
  styleUrls: ['./add-complain.component.css']
})
export class AddComplainComponent implements OnInit {

  complain: Complaint;
  complainList: Array<Complaint>;
  cheaked: boolean;
  comment:string;
  showErrMsg:Boolean=false;
  constructor(private activatedRoute: ActivatedRoute,
    private complainSer: ComplaintsService,
    public customerSer:CustomeresService,
    public comouterSer:ComputerWithProgramService) { }

  ngOnInit() {
    if(this.customerSer.list==null ||this.customerSer.list==undefined||this.customerSer.list.length<1)
    this.customerSer.GetCoustomer().subscribe(myData=>
    {
this.customerSer.list=myData
this.initConplain();
if (this.complain.HasCeared == true)
      this.cheaked = true
    else
      this.cheaked = false
    })
    else
    {this.initConplain();
    if (this.complain.HasCeared == true)
      this.cheaked = true
    else
      this.cheaked = false
    }
  }

  initConplain() {
    this.complainSer.GetComplain().subscribe(
      myData => {
        //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
        this.complainList = myData;
        console.log("computers", myData);
        this.complainList.forEach(c=>c.nameCustomer= this.customerSer.list.find(cu=>cu.Id== c.IdCustomer).FirstName+" "+this.customerSer.list.find(cu=>cu.Id== c.IdCustomer).LastName)
      
      },
      myErr => { console.log(myErr.message); });
  }

  deletComplain(id: number) {
    this.complainSer.deleteComplain(id).subscribe(
      myData => {
        //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
        console.log("computers", myData);
        this.initConplain();
      },
      myErr => { console.log(myErr.message); });
    this.initConplain();
  }

  cheakButton(e: Complaint,comment:string,idCustomer:number) {
    alert("השינוי בוצע בהצלחה, ההודעה נשלחה ללקוח")
    debugger
    this.complainSer.updateComplain(e.IdComplaints, !e.HasCeared,comment,idCustomer).subscribe(
      myData => {
        //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
        console.log("computers", myData);
        this.initConplain();
      },
      myErr => { console.log(myErr.message); });
    this.initConplain();
  }
 c:ComputerWithProgram;
  viewComp(id:number){
    
   if(this.complainSer.list!=null){
    this.c= this.comouterSer.list.find(c=>c.Id==id)
    // alert(this.c.Memory+this.c.OrdersDate+this.c.ScreenSize+this.c.Type)
    this.showErrMsg=true
  }
  else{
   this.comouterSer.GetComputerbyid(id).subscribe(
    myData => {
      //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
      this.c=  myData      
    },
    myErr => { console.log(myErr.message); });
  }
}
}