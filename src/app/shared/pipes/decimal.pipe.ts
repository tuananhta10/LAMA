import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimal'
})
export class DecimalPipe implements PipeTransform {

  transform(value: any): any {

    if(typeof value !== 'number'){
      return value
    }

    if(!value.toString().includes('.')){
      return value
    }

    const rounded = Math.round(value * 100) / 100

    return rounded.toFixed(2);
  }

}
