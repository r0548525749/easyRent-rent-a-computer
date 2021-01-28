import { Order } from './Order';

export class Software {
    constructor(){}
    
    public SoftwareId:number
    public Name:number
    public VertionName:number
    public ProgramName:string
    public VersionKod:number
    public Comment:string
    public Img:string
    public OrdersDate: Array<Order>
}
