import { Time } from '@angular/common';

export class Order {
    constructor(
    public Id:number=null,
    public FromDate:Date=null,
    public ToDate:Date=null,
    public ProudactId:number=null,
    public MemberId:number=null,
    public StoreId:number=null, 
    public DateAndTimeTake:string=null,
    public DateAndTimeReturn:string=null,
    public IdCustomer:number=null){}
}
