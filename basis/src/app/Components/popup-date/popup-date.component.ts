import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-popup-date',
  templateUrl: './popup-date.component.html',
  styleUrls: ['./popup-date.component.css']
})
export class PopupDateComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  check: number = 0;
  DataForm: FormGroup;
  fromDate:string;
  toDate:string;
  submitted = false;
  hide = true;
  form: any;
  constructor(public matdialog: MatDialogRef<PopupDateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }
  onCloase() {
    this.submitted = false;
    this.matdialog.close();
  }
  onReset() {
    this.submitted = false;
    this.DataForm.reset();
    // this.router.navigateByUrl(['/try/']);
  }
}
