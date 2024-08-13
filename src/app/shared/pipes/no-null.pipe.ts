import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noNull'
})
export class NoNullPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
