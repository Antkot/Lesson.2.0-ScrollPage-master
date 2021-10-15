import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { Hash, Measure, Product } from '../../types';
import { map } from 'rxjs/operators';
import { MeasuresStorageService } from '../../part-components/services/measures-storage.service';

@Pipe({
  name: 'measuresTranslator'
})

export class MeasuresTranslatorPipe implements PipeTransform {
  measures$: Observable<Array<Measure>> = this.measureService.measures$;

  constructor(private measureService: MeasuresStorageService) {
  }

  transform(givenMeasureId: string): Observable<string> {
    return this.measures$.pipe(
      map((measure) => {
        return measure.find(
          ({ measureId }) =>
            measureId === givenMeasureId
        ).name;
      }));
  }
}
