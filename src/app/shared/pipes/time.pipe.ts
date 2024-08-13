import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: number): unknown {

    if(!value) return value

    const hours = Math.floor(value); 
    const minutes = Math.round((value - hours) * 60);
    let formattedTime = "";

    if (hours > 0) {
      formattedTime += hours + (hours > 1 ? ' hrs ' : ' hr ');
    }

    if (minutes > 0) {
      formattedTime += minutes + (minutes > 1 ? ' mins' : ' min ');
    }

    return formattedTime;
  }

}
