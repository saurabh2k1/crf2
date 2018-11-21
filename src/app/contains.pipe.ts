import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contains'
})
export class ContainsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.indexOf(args) >= 0;
  }

}
