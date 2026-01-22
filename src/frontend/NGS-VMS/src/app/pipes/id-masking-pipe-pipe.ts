import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mask'
})
export class IdMaskingPipePipe implements PipeTransform {

  transform(value: string): string {
    const masked = '*'.repeat(value.length);
    return masked;
  }

}
