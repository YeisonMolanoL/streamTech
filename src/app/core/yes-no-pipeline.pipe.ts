import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesNoPipeline'
})
export class YesNoPipelinePipe implements PipeTransform {

  transform(value: boolean): unknown {
    return value ? 'Sí' : 'No';
  }

}
