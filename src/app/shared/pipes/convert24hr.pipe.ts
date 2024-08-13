import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'convert24hr'
})
export class Convert24hrPipe implements PipeTransform {

  transform(value: unknown): unknown {

    if(!value) return value
    
    return moment(value, 'hh:mm A').format('HH:mm')
  }

}
