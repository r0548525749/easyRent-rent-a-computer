import { Component, OnInit, Input, Inject, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {
  @Input() parentData;
  @ViewChild(SignaturePad, null) signaturePad: SignaturePad;
  toastCtrl: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public matdialog: MatDialogRef<HelloComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.InitSignaturePad();
  }

  InitSignaturePad() {
    this.signaturePad.toDataURL()
    console.log(this.signaturePad);
    // this.onCloase();  
  }
  
  // let toast = this.toastCtrl.create({
  //   message: 'You have to Signature first.',
  //   duration: 3000,
  //   position: 'c'
  // });
  // toast.present();
  // let toast = this.toastCtrl.create({
  //   message: 'New Signature saved.',
  //   duration: 3000,
  //   position: 'top'
  // });
  // toast.present();

  onCloase() {
    if (this.signaturePad.isEmpty() == true) {
      alert("יש לחתום !!");
    }
    else {
      this.signaturePad.clear();
      console.log(this.signaturePad);
      this.matdialog.close();
    }
  }

  signaturePadOptions: Object = {
    // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 500,
    'canvasHeight': 300
  };

  ngAfterViewInit() {
    this.signaturePad.set('minWidth', 5);
    this.signaturePad.clear();
  }

  drawComplete() {
    console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    console.log('begin drawing');
  }

}
