export class Complaint {
    constructor(
        public IdComplaints: number = null,
        public IdCustomer: number = null,
        public Complaints: string = "",
        public HasCeared: boolean = null,
        public ManagerComplain: string = "",
        public IdComputer:number=null,
        public Date?:Date,
        public nameCustomer?:string
        ) {}
}
