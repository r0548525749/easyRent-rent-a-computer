import { Order } from './Order';
import { Softwer2 } from './softwer2';
import { statusDate } from './ststusDate';

export class ComputerWithProgram {
    constructor(
        public Id: number = null,
        public LepTopId: number = null,
        public CompanyId: number = null,
        public CompanyName: string = "",
        public CompanyImg: string = "",
        public Type:string="",
        public Prossess: string = "",
        public Memory: string = "",
        public HardDisk: string = "",
        public ScreenSize: string = "",
        public ComputerImg: string = "",
        public Programslist: Array<Softwer2>=null,
        public OrdersDate: Array<Order>=null   ,
       //כל תאריך שמוצג על הלוח מה הסטטוס שלו- 3-תפוס, 2 -פנוי חלקית
        public ListStatus:Array<statusDate>=null
    ) { }
}
export class ComputerWithProgramWithDate {
    constructor(
        public Id: number = null,
        public LepTopId: number = null,
        public CompanyId: number = null,
        public CompanyName: string = "",
        public CompanyImg: string = "",
        public Type:string="",
        public Prossess: string = "",
        public Memory: string = "",
        public HardDisk: string = "",
        public ScreenSize: string = "",
        public ComputerImg: string = "",
        public Programslist: Array<Softwer2>=null,
        public dateF:Date,
        public dateE:Date,
        public orderID:number,
        public datePass:boolean
       
    ) { }
}




// public SoftwareId:number=null,
// public ProgramId:number=null,
// public CompanyId:number=null,
// public ProgramName:string=null,
// public ProgramVersionName:string=null,
// public ProgramVersionId:number=null,
// public ProgramImg:string=null,