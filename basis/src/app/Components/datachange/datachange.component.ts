import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Software } from 'src/app/Classes/software';
import { SoftwaresService } from 'src/app/Services/softwares.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ComputerWithProgram, ComputerWithProgramWithDate } from 'src/app/Classes/computer-with-program';
import { ComputerWithProgramService } from 'src/app/Services/computer-with-program.service';
import { CompanyService } from 'src/app/Services/company.service';
import { Company } from 'src/app/Classes/company';
import { Computer, ComputerDetails, ComputerKind } from 'src/app/Classes/computer';
import { TypeCompuetService } from 'src/app/Services/type.service';
import { Program } from 'src/app/Classes/program';
import { ProgramesService } from 'src/app/Services/programes.service';
import { HttpEventType } from '@angular/common/http';
import { ProgramWithVersion } from 'src/app/Classes/programWithVersion';

@Component({
  selector: 'app-datachange',
  templateUrl: './datachange.component.html',
  styleUrls: ['./datachange.component.css']
})
export class DatachangeComponent implements OnInit {
  softwers: Software = new Software();
  SoftwerList: Array<Software>;
  check: number = 0;
  DataForm: FormGroup;
  submitted = false;
  hide = true;
  form: any;
  tt=0;
  @Input() parentData;
  dataFromManager: any;
  computer: Computer = new Computer();
  computerDetails: ComputerDetails = new ComputerDetails();
  typesList: ComputerKind[];
  companiesList: Company[];
  CompanySelected: Company = new Company();
  TypeSelected: ComputerKind = new ComputerKind();
  fileToUpload: File = null;
  toppings = new FormControl();
  programList: Array<ProgramWithVersion>;
  programsChecked: Array<Program>=new Array();

  constructor(
    private activatedRoute: ActivatedRoute,
    private SoftwerSer: SoftwaresService,
    private ComputerWithProgramSer: ComputerWithProgramService,
    private CompanySer: CompanyService,
    private TypeSer: TypeCompuetService,
    private programser:ProgramesService,
    private formBuilder: FormBuilder,
    public matdialog: MatDialogRef<DatachangeComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any) {

  }
  ngOnInit() {
    this.InitSoftwer();
    this.InitcheakDialog();
    // this.InitDataform();

    if (this.CompanySer.list != null)
      this.companiesList = this.CompanySer.list;
    if (this.TypeSer.list != null)
      this.typesList = this.TypeSer.list;

      if(this.data!=null)
      {
        this.computer={...this.data.editComputer};
        this.computerDetails={...this.data.editComputerDetails};
      }
    console.log(this.companiesList);
    this.programser.GetProgramWithVersion().subscribe(
      myData => {
        //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
        this.programList = myData;
      },
      myErr => { console.log(myErr.message); });

  }

  addCompany() {
    if (this.CompanySelected.Id == 0) {
    }
  }
  addType() {
    if (this.TypeSelected.Id == 0) {
    }
  }
  filterByProgramName(event)
  {
    this.programsChecked=event;
  }
  // InitDataform() {
  //   this.DataForm = this.formBuilder.group({
  //     Softwerid: ['', [Validators.required, Validators.minLength(2)]],
  //     softwerName: ['', Validators.required],
  //     softwerVersion: ['', Validators.required],
  //     softwerComment: ['', Validators.required],
  //     softwerPic: ['', Validators.required]
  //   });
  // }

  InitcheakDialog() {
    if (this.matdialog != null)
      this.func1();
  }

  InitSoftwer() {
    this.activatedRoute.params.subscribe(
      myParam => {
        this.SoftwerSer.GetSoftwares().subscribe(
          myData => {
            this.SoftwerList = myData;
          },
          myErr => { alert(myErr.message); });
      }
    )
  }

  get f() { return this.DataForm.controls; }
  p:ComputerWithProgram=new ComputerWithProgram();

  onSubmit() {
    if(this.data.editComputer!=null)
    {
      if(this.data.editComputer.ProudactName!=this.computer.ProudactName ||
         this.data.editComputer.Discription!=this.computer.Discription ||
         this.data.editComputer.ProudactKindId!=this.computer.ProudactKindId  )
      this.ComputerWithProgramSer.updateComputer(this.computer).subscribe(myData=>
      {
    
        if(this.data.editComputerDetails.CompanyId!=this.computerDetails.CompanyId ||
          this.data.editComputerDetails.HardDisk!=this.computerDetails.HardDisk || 
          this.data.editComputerDetails.Memory!=this.computerDetails.Memory ||
          this.data.editComputerDetails.Picture!=this.computerDetails.Picture||
          this.data.editComputerDetails.Process!=this.computerDetails.Process||
          this.data.editComputerDetails.ScreenSize!=this.computerDetails.ScreenSize)
          this.ComputerWithProgramSer.updateComputerDetails(this.computerDetails).subscribe(()=>this.onCloase())
        }
        )
      else
      if(this.data.editComputerDetails.CompanyId!=this.computerDetails.CompanyId ||
         this.data.editComputerDetails.HardDisk!=this.computerDetails.HardDisk || 
         this.data.editComputerDetails.Memory!=this.computerDetails.Memory ||
         this.data.editComputerDetails.Picture!=this.computerDetails.Picture||
         this.data.editComputerDetails.Process!=this.computerDetails.Process||
         this.data.editComputerDetails.ScreenSize!=this.computerDetails.ScreenSize)
         this.ComputerWithProgramSer.updateComputerDetails(this.computerDetails).subscribe(()=>this.onCloase())
    }
    else
    {
       this.ComputerWithProgramSer.addComputerDetails(this.computerDetails).subscribe(
      myData => {

        if (myData != 0) {
          this.computer.ProductDetailsId = myData;
          this.ComputerWithProgramSer.addNewComputer(this.computer,this.computerDetails,this.programsChecked).subscribe(myData =>
             {  this.ComputerWithProgramSer.uploadImage(this.pic[0],this.computer.ProductDetailsId).subscribe(
              data => {
              
                this.data.editComputer.Picture=this.pic[0].name;
              }
            ); }
             , err => { debugger })
        }
        this.onCloase()
        console.log(myData)
      },
      err => {
        this.onCloase()
        console.log(err)
      }
    );

    }
   

    // this.submitted = true;
    // // stop here if form is invalid
    // if (this.DataForm.invalid) {
    //   this.DataForm.reset();
    //   this.DataForm.value.SUCCESS('::submited Succsefuly');
    // }
    // else {
    //    this.AddSoftwer();
    //   this.onCloase();
    //   this.DataForm.value.SUCCESS('::submited Succsefuly');
    // }
  }

  onCloase() {
    this.submitted = false;
    this.matdialog.close();
  }

  onReset() {
    this.submitted = false;
    this.DataForm.reset();
  }

  AddSoftwer() {
    this.data = this.softwers;
    this.SoftwerSer.addSoftwerOnServer(this.softwers).subscribe(
      myData => {
        alert("add sucssesful"); this.softwers = myData;
        debugger
      },
      myErr => { alert(myErr.message); });
  }

  edit() {
    this.data = this.softwers;
    this.SoftwerSer.UpdateSoftwer(this.softwers).subscribe(
      myData => { console.log("update sucssesful"); },
      myErr => { console.log(myErr.message); });
  }

  func1() {
    this.dataFromManager = this.data;
  }
pic:any
//תמונה
handleFileInput(file) {
  debugger
  this.pic=file
  // this.ComputerWithProgramSer.uploadImage(file[0]).subscribe(
  //   data => {
    
  //     this.data.editComputer.Picture=file[0].name;
  //   }
  // );
}

}
