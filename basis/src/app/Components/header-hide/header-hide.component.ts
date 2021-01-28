import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomeresService } from 'src/app/Services/customeres.service';

@Component({
  selector: 'app-header-hide',
  templateUrl: './header-hide.component.html',
  styleUrls: ['./header-hide.component.css']
})
export class HeaderHideComponent implements OnInit {

  isManager:Boolean=false;
  isSecretery:Boolean=false;

  constructor(protected customerSer:CustomeresService,private router:Router) { }

  ngOnInit() {
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

  cheackUser(){
     if(this.customerSer.CurrentCustomer.Gmail=="")
this.isManager=true;
  }
  
}
