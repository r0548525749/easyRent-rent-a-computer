export class Computer
{
    ProudactName:string;
    Discription:string;
    ProudactKindId:number;
    ProductDetailsId:number;
}
export class ComputerKind
{
    Id:number;
    Name:string
}
export class ComputerDetails
{
    Id:number;
    CompanyId:number;
    Memory:string;
    Process:string;
    HardDisk:string;
    ScreenSize:string;
    Picture:string;
}