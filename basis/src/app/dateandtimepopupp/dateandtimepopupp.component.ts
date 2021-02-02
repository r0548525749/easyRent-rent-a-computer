import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-dateandtimepopupp',
  templateUrl: './dateandtimepopupp.component.html',
  styleUrls: ['./dateandtimepopupp.component.css']
})
export class DateandtimepopuppComponent implements OnInit {
  date = new FormControl(moment([2017, 0, 1]));
  range: FormGroup;

  constructor() { }

  ngOnInit() {

  }

}


