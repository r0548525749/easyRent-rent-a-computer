import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Classes/Order';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-ordercomponent',
  templateUrl: './ordercomponent.component.html',
  styleUrls: ['./ordercomponent.component.css']
})
export class OrdercomponentComponent implements OnInit {
  ordersList:Array<Order>;
  currOrder:Order;
  isEdit:boolean = false;
  orders:Order;
  g1:number=0;

  constructor(private ordersSer:HomeService) {}
  
  ngOnInit() {
    this.ordersSer.GetOrders().subscribe(
      myData => 
      { 
        this.ordersList = myData;
      }, 
      myErr=>{ console.log(myErr.message);});
  }
  
}
