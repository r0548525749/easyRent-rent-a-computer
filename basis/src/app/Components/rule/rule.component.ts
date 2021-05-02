import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Rule } from 'src/app/Classes/rule';
import { RulesService } from 'src/app/Services/rules.service';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.css']
})
export class RuleComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  options: FormGroup;
  rule: Array<Rule>;
  customers: Rule = new Rule();
  index: any;
  sum:number=0;
  constructor(private formBuilder: FormBuilder,
    private rulesSer: RulesService,
   private router: Router
   ) { }

  ngOnInit() {
    this.rulesSer.GetRule().subscribe(
      myData => {
        //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
        this.rule = myData;
      },
      myErr => { console.log(myErr.message); });
    this.options = this.formBuilder.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  click(price:number){
  this.sum+=price;
  this.rulesSer.CurrentRull+=this.sum;
  alert( this.rulesSer.CurrentRull)
  }

  showSum(){
   this.router.navigate(['/return']);
  }
}
