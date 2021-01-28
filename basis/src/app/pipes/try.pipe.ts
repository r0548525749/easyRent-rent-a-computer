import { Pipe, PipeTransform, Version } from '@angular/core';
import { Software } from '../Classes/software';
import { ComputerWithProgram } from '../Classes/computer-with-program';

@Pipe({
  name: 'try'
})

export class TryPipe implements PipeTransform {
  transform(allSoftwers: ComputerWithProgram[], args: any,typpe:string) {
    if (args != undefined) { 
      switch (typpe) {
       // case 'selectedValue': return allSoftwers.filter(x => x.Programslist == args);
        case 'selectedMemory': return allSoftwers.filter(x => x.Memory == args);
        case 'selectedType': return allSoftwers.filter(x => x.Type == args);
        case 'selectedProcess': return allSoftwers.filter(x => x.Prossess == args);
        case 'selectedCompany': return allSoftwers.filter(x => x.CompanyName == args);
        case 'selectedHardDisk': return allSoftwers.filter(x => x.HardDisk == args);
        case 'selectedScreanSize': return allSoftwers.filter(x => x.ScreenSize == args);
      }
    }
    else
      return allSoftwers;
  }
  // switch args:
  // case 'selectedValue':return allSoftwers.filter(x => x.Name == args);
  // case 'selectedVersion':return allSoftwers.filter(x => x.Name == args);
  // case 'selectedValue':return allSoftwers.filter(x => x.Name == args);
 // if(allSoftwers.find(x=>x.Name=='selectedValue'))
      // return allSoftwers.filter(x => x.Name == args);
  // transform(arr: any[], prop: string, value: string , method:Method): any {
  //   if (arr) {
  //     if (!value) {
  //       return arr
  //     } else {
  //       return arr.filter(obj => this.filter(obj[prop],value, method))
  //     }
  //   } else {
  //     return []
  //   }
  // }

  // filter(source :string, target :string, method:Method) : boolean {

  //   switch(method) {
  //     case "includes" : return source.includes(target)
  //     case "equal"  : return source === target
  //     case "not-equal" : return source !== target
  //   }
  // }
}

type Method = "includes" | "equal" | "not-equal"

