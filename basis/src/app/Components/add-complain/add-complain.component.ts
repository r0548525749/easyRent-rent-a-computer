import { Component, OnInit } from '@angular/core';
import { Complaint } from 'src/app/Classes/complaint';
import { ActivatedRoute } from '@angular/router';
import { ComplaintsService } from 'src/app/Services/complaints.service';

@Component({
  selector: 'app-add-complain',
  templateUrl: './add-complain.component.html',
  styleUrls: ['./add-complain.component.css']
})
export class AddComplainComponent implements OnInit {

  complain:Complaint;
  complainList: Array<Complaint>;

  constructor( private activatedRoute: ActivatedRoute,
    private complainSer: ComplaintsService, ) { }

  ngOnInit() {
    this.initConplain();
  }
  
  initConplain(){
  this.complainSer.GetComplain().subscribe(
    myData => {
      //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
      this.complainList = myData;
      console.log("computers", myData);
    },
    myErr => { console.log(myErr.message); });
  }

  deletComplain(id:number){
    debugger
    this.complainSer.deleteComplain(id).subscribe(
      myData => {
        //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
        console.log("computers", myData);
        this.initConplain();
      },
      myErr => { console.log(myErr.message); });
      this.initConplain();
    }
}
