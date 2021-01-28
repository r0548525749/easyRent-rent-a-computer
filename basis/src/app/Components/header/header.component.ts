import { Component, OnInit, HostListener, DoCheck } from '@angular/core';
import { CustomeresService } from 'src/app/Services/customeres.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,DoCheck {

  isManager:Boolean=false;
  isSecretery:Boolean=false;

  constructor(protected customerSer:CustomeresService,private router:Router) { }

  ngOnInit() {
    this.checkUserLevel()
  }

  checkUserLevel(){
    // console.log("checkUserLevel",this.customerSer.CurrentCustomer)

    if(this.customerSer.CurrentCustomer.Level==1){
      this.isManager=true;
    }
    else if(this.customerSer.CurrentCustomer.Level==2) 
    {
      this.isSecretery=true;  
    } 
  }
  
  // isSticky: boolean = false;
  // @HostListener('window:scroll', ['$event'])
  // checkScroll() {
  //   this.isSticky = window.pageYOffset >= 250;
  // }
  goTo(url:string){
    if(this.customerSer.CurrentCustomer!=undefined&&this.customerSer.CurrentCustomer!=null){
      this.router.navigate([url])
    }
    else{
      alert("יש להכנס כלקוח");
      this.router.navigate(['/existing/']);
    }
  }
  
  logOut()
  {
    this.customerSer.CurrentCustomer=undefined;
    this.router.navigate(['/existing/']);
  }

  ngDoCheck()
  {
    this.checkUserLevel()
  }
}
