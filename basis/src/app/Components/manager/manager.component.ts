import { Component, OnInit, Input } from '@angular/core';
import { SoftwaresService } from 'src/app/Services/softwares.service';
import { ActivatedRoute } from '@angular/router';
import { Software } from 'src/app/Classes/software';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { from } from 'rxjs';
import { DatachangeComponent } from '../datachange/datachange.component';
import Swal from 'sweetalert2';
import swal from 'sweetalert';
import { ComputerWithProgram } from 'src/app/Classes/computer-with-program';
import { Softwer2 } from 'src/app/Classes/softwer2';
import { ComputerWithProgramService } from 'src/app/Services/computer-with-program.service';
import { Product } from 'src/app/Classes/product';
import { ProductService } from 'src/app/Services/product.service';
import { CreateComanyComponent } from '../create-company/create-company.component';
import { Program } from 'src/app/Classes/program';
import { ProgramesService } from 'src/app/Services/programes.service';
import { Computer, ComputerDetails } from 'src/app/Classes/computer';
import { Company } from 'src/app/Classes/company';
import { CompanyService } from 'src/app/Services/company.service';
import { ProgramChangeComponent } from '../program-change/program-change.component';

import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})

export class ManagerComponent implements OnInit,AfterViewInit {
  Software: Software;
  softwareList:Array<Software>;
  Product: Product;
  CompanyList: Array<Company>;
  Program: Program;
  ProgramList: Array<Program>;
  computerWithProgramList: Array<ComputerWithProgram> = [];
  computerWithProgramListFilter: Array<ComputerWithProgram>;
  Softwer2List: Array<Softwer2>;
  computerWithProgram: ComputerWithProgram;
//טבלה למחשב
displayedColumns: string[] = ['Id','CompanyName', 'Type', 'Prossess','Memory','HardDisk','ScreenSize','UpdateItem','RemoveItem'];
dataSource = null;
//טבלה להצגת תוכנות
displayedColumns1: string[] = ['Id','ProgramName','ImgProgram','EditProgram','DeletProgram'];
dataSource1 = null;
//טבלה להצגת חברות
displayedColumns2: string[] = ['Id','CompanyName','Img','EditCompany','DeletCompany'];
dataSource2 = null;

  @ViewChild(MatPaginator,{ static: true })  paginator :MatPaginator   
  @ViewChild(MatPaginator, { static: true }) paginator1: MatPaginator;
  @ViewChild(MatPaginator,{ static: true })  paginator2 :MatPaginator 

 
  constructor(
    private activatedRoute: ActivatedRoute,
    private computerWithprogrameSer: ComputerWithProgramService,
    private softwerSer: SoftwaresService,
    private productSer: ProductService,
    private programSer: ProgramesService,
    private companySer: CompanyService,
    private dialog: MatDialog) {
    this.InitComputerWithProgram();
    this.initSoftwer();
    this.InitCompany();
    this.InitProgram();
   
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource1.paginator = this.paginator1;
    this.dataSource2.paginator = this.paginator2;
  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource<ComputerWithProgram>(this.computerWithProgramList);
    this.dataSource1 = new MatTableDataSource<Program>(this.ProgramList);
    this.dataSource2 = new MatTableDataSource<Company>(this.CompanyList);
  }
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }


  InitProgram(): void {
    this.programSer.GetPrograms().subscribe(
      myData => {
        debugger
        //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
        this.ProgramList = myData;
        this.dataSource1 = new MatTableDataSource<Program>(myData);
     // this.dataSource1.paginator = this.paginator1;
      },
      myErr => { console.log(myErr.message); })
  }

  InitCompany() {
    this.companySer.GetCompanies().subscribe(
      myData => {
        //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
        this.CompanyList = myData;
        this.dataSource2 = new MatTableDataSource<Company>(this.CompanyList);
        this.dataSource2.paginator = this.paginator2;
      },
      myErr => { console.log(myErr.message); });
  }

  initSoftwer() {
    this.softwerSer.GetSoftwares().subscribe(
      myData => {
        //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
        this.softwareList = myData;
      },
      myErr => { console.log(myErr.message); });
  }
  func(any:any){
    
  }
  InitComputerWithProgram() {
    this.computerWithprogrameSer.GetComputers().subscribe(
      myData => {
        //הפרמטר המתקבל הוא הנתונים שחזרו מהשרת
        this.computerWithProgramList = myData;
        this.dataSource = new MatTableDataSource<ComputerWithProgram>(this.computerWithProgramList);
        this.dataSource.paginator = this.paginator;
         this.dataSource1 = new MatTableDataSource<Program>(this.ProgramList);
         this.dataSource1.paginator = this.paginator1;
         this.dataSource2 = new MatTableDataSource<Company>(this.CompanyList);
         this.dataSource2.paginator = this.paginator2;
      },
      myErr => { console.log(myErr.message); });

      this.dataSource = new MatTableDataSource<ComputerWithProgram>(this.computerWithProgramList);
      this.dataSource.paginator = this.paginator;
      this.dataSource1 = new MatTableDataSource<Program>(this.ProgramList);
      this.dataSource1.paginator = this.paginator1;
      this.dataSource2 = new MatTableDataSource<Company>(this.CompanyList);
      this.dataSource2.paginator = this.paginator2;
  }
 
  createCompany() {
    debugger
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = true;
    DialogConfig.autoFocus = true;
    DialogConfig.width = "45%";
    DialogConfig.data = { name: new Company(), from: String };
    DialogConfig.data.from = "הוסף ";
    const dialogRef = this.dialog.open(CreateComanyComponent, DialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.CompanyList = this.companySer.list;
      this.InitCompany()
      console.log(result);
    });
  }

  OnEditProduct(s: Software) {
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = true;
    DialogConfig.autoFocus = true;
    DialogConfig.width = "45%";
    DialogConfig.data = s;
    const dialogRef = this.dialog.open(DatachangeComponent, DialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  creatSoftwer() {
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = true;
    DialogConfig.autoFocus = true;
    DialogConfig.width = "45%";
    DialogConfig.data = { name: new Program(), from: String };
    DialogConfig.data.from = "new";
    const dialogRef = this.dialog.open(ProgramChangeComponent, DialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      debugger
      this.ProgramList = this.programSer.list;
      this.InitProgram()
    });
  }
  OnEditProgram(p: Program) {
    debugger
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = true;
    DialogConfig.autoFocus = true;
    DialogConfig.width = "45%";
    DialogConfig.data = { editProgram: Program, from: String };
    DialogConfig.data.from = "Edit";
    DialogConfig.data.editProgram = { ...p };
    const dialogRef = this.dialog.open(ProgramChangeComponent, DialogConfig);
    dialogRef.afterClosed().subscribe(result => {

      this.ProgramList = this.programSer.list;
      this.InitProgram()
    });
  }
  OnEditComapny(c:Company)
  {
    debugger
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = true;
    DialogConfig.autoFocus = true;
    DialogConfig.width = "45%";
    DialogConfig.data = { editProgram: Company, from: String };
    DialogConfig.data.from = "Edit";
    DialogConfig.data.editCompany = { ...c };

    const dialogRef = this.dialog.open(CreateComanyComponent, DialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      debugger
      this.companySer.list=result
      this.CompanyList = this.companySer.list;
      this.InitCompany()
    });
  }
  create() {
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = true;
    DialogConfig.autoFocus = true;
    DialogConfig.width = "45%";
    DialogConfig.data = { name: new ComputerWithProgram(), from: String };
    DialogConfig.data.from = "new";
    const dialogRef = this.dialog.open(DatachangeComponent, DialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.InitComputerWithProgram()
    });
  }
  editComputer: Computer;
  editComputerDetails: ComputerDetails;
  OnEdit(sId: number) {

    this.productSer.GetProductById(sId).subscribe(myData => {
      if (myData != null) {
        this.editComputer = myData
        this.productSer.GetProductDetails(this.editComputer.ProductDetailsId).subscribe(myData => {
          if (myData != null) {
            this.editComputerDetails = myData
            const DialogConfig = new MatDialogConfig();
            DialogConfig.disableClose = true;
            DialogConfig.autoFocus = true;
            DialogConfig.width = "45";
            DialogConfig.data = { editComputer: Product, editComputerDetails: ComputerDetails, from: String };
            DialogConfig.data.from = "עריכת ";
            DialogConfig.data.editComputer = this.editComputer;
            DialogConfig.data.editComputerDetails = this.editComputerDetails;
            const dialogRef = this.dialog.open(DatachangeComponent, DialogConfig);
            dialogRef.afterClosed().subscribe(result => {
              this.InitComputerWithProgram()
            });
          }
        }
        )
      }

    }
    )
    // const DialogConfig = new MatDialogConfig();
    // DialogConfig.disableClose = true;
    // DialogConfig.autoFocus = true;
    // DialogConfig.width = "60%";
    // DialogConfig.data = {editComputer:Product, editComputerDetails:ComputerDetails};
    // DialogConfig.data.editComputer=this.editComputer;
    // DialogConfig.data.editComputerDetails=this.editComputerDetails;
    // const dialogRef = this.dialog.open(DatachangeComponent, DialogConfig);
    // dialogRef.afterClosed().subscribe(result => {
    // });
    
  }

  OnDelete(id1: number) {
 
    Swal.fire({
      title: 'Are you sure?',
      text: 'This product will be permanently deleted',
      cancelButtonColor: "#FF6600",
      confirmButtonColor: "#FF6600",
      showCancelButton: true,
      cancelButtonText: 'Cancle',
      confirmButtonText: 'Submit',

      allowOutsideClick: () => !Swal.isLoading()
    })
      .then((willDelete) => {
        if (willDelete.isConfirmed) {
          if (this.computerWithProgramList.filter(c => c.Id == id1 && c.OrdersDate.length > 0).length > 0) {
            Swal.fire({
              title: 'Are you sure?',
              text: 'למחשב זה יש הזמנות. אתה בטוח רוצה למחוק?',
              cancelButtonColor: "#FF6600",
              confirmButtonColor: "#FF6600",

              showCancelButton: true,
              cancelButtonText: 'Cancle',
              confirmButtonText: 'Submit',

              allowOutsideClick: () => !Swal.isLoading()
            }).
              // Swal.fire(
              //   'Are you sure?',
              //   'למחשב זה יש הזמנות. אתה בטוח רוצה למחוק?',
              //   'question',
              // ).
              then((willDelete) => {
                if (willDelete.isConfirmed) {
                  this.removeComuter(id1);
                }
              })
          }
          else {
            this.removeComuter(id1);
          }

        }
      })
  }

  removeComuter(id1: number) {
    this.computerWithprogrameSer.removeComputer(id1).subscribe(myData => {
      debugger
      this.dataSource = myData
      console.log("delete Computer  ", myData);

    });

  }

  OnDeleteProgram(id:number)
  {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This Program will be permanently deleted',
      cancelButtonColor: "#FF6600",
      confirmButtonColor: "#FF6600",
      showCancelButton: true,
      cancelButtonText: 'Cancle',
      confirmButtonText: 'Submit',

      allowOutsideClick: () => !Swal.isLoading()
    })
      .then((willDelete) => {
        if (willDelete.isConfirmed) {
          this.programSer.RemoveProgram(id).subscribe(myData => {
            debugger
            this.programSer.list = myData
            console.log("delete Computer  ", myData);
            this.ProgramList=myData

          });
        }
      })
  }
  OnDeleteCompany(id1: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This Company will be permanently deleted',
      cancelButtonColor: "#FF6600",
      confirmButtonColor: "#FF6600",
      showCancelButton: true,
      cancelButtonText: 'Cancle',
      confirmButtonText: 'Submit',

      allowOutsideClick: () => !Swal.isLoading()
    })
      .then((willDelete) => {
        if (willDelete.isConfirmed) {
          this.companySer.RemoveCompany(id1).subscribe(myData => {
            debugger
            this.CompanyList = myData
            console.log("delete Computer  ", myData);

          });
        }
      })
  }


}
