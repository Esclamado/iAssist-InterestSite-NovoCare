import { KeyValueDiffers, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zipCode'
})
export class ZipCodePipe implements PipeTransform {
  transform(value: string, args?: any): any {
    if (value) {
      value = value.replace(/\D/g, '');

      if (value.length > 9) {
        value = value.substring(0, 8);
      }

      switch (value.length) {
        case 5:
          value = value;
          break;
        case 9:
          value = `${value.slice(0, 5)}-${value.slice(5, 9)}`;
          break;
        default:
          return value;
      }
    }
    return value;
  }
}
