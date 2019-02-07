import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'banana'
})
export class BananaPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let banana = `${value} bananas`;
    if (value === 1 || value === -1) {
      banana = `${value} banana`;
    }
    return banana;
  }

}
