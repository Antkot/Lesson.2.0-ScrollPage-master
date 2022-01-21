import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appForbiddenName]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ForbiddenNameDirective, multi: true }]
})
export class ForbiddenNameDirective implements Validator {
  @Input('appForbiddenName') forbiddenName = '';

  validate(control: AbstractControl): ValidationErrors | null {
    // @ts-ignore
    return this.forbiddenName ? ForbiddenNameDirective(new RegExp(this.forbiddenName, 'i'))(control) : null;
  }

  constructor() {
  }
}
