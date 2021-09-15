import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { Hashes, Measures, Products } from '../types';
import { map } from 'rxjs/operators';
import { MeasuresStorageService } from '../part-components/services/measures-storage.service';

@Pipe({
  name: 'measuresTranslator'
})

export class MeasuresTranslatorPipe implements PipeTransform {
  measures$: Observable<Array<Measures>> = this.measureService.measures$;

  constructor(private measureService: MeasuresStorageService) {
  }

  transform(value: any) {

    return this.measures$.pipe(
      map((measure) => {
        return measure.find(
          ({ measureId}) =>
            measureId === value.measureId
        ).name;
      }));
  }
}
