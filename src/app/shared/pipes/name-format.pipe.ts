import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFormat'
})
export class NameFormatPipe implements PipeTransform {

  transform(value: string): unknown {

    if(!value) return value

    const lastIndex = value.lastIndexOf(' ')
    const firstName = value.substring(0, lastIndex);
    const lastName = value.substring(lastIndex + 1);
    const formattedName = `${lastName}, ${firstName}`;
    return formattedName
  }

}
