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
   private router: Router) { }

    displayedColumns: string[] = ['IdRule', 'Description', 'Type', 'Price','RemoveItem'];
    dataSource1 =null;
  
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
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
    debugger
    this.dataSource1=new MatTableDataSource<Rule>(this.rule);
    this.dataSource1.paginator = this.paginator;
  }
  click(price:number){
  this.sum+=price;
  this.rulesSer.CurrentRull=this.sum;
  }
  showSum(){

    alert(this.sum)
 this.router.navigate(['/return']);
  }
}
