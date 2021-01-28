import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trying',
  templateUrl: './trying.component.html',
  styleUrls: ['./trying.component.css']
})
export class TryingComponent implements OnInit {
 skills =[
    {name:'angular'},
    {name:'react'},
    {name:'vue'},
    {name:'javascript'},
    {name:'c#'},
    {name:'css'},
    ]
  constructor() { }
 
  ngOnInit() {
  }

}
