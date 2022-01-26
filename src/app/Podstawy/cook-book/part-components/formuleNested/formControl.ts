import { ControlValueAccessor } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AliveState } from '../../../../ActiveState';
export abstract class AbstractValueAccessor extends AliveState
  implements ControlValueAccessor {
  protected starterValue = null;
  public valueSubject = new BehaviorSubject<any>(this.starterValue);
  private _value: any = '';
  public get value(): any {
    return this._value;
  }
  public set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
      this.onTouched(v);
      this.valueSubject.next(v);
    }
  }
  public stopEvents(event: KeyboardEvent) {
    event.stopPropagation();
    return false;
  }
  public writeValue(value: any) {
    this._value = value;
    this.valueSubject.next(value);
    this.onChange(value);
  }
  public onChange = (_) => {};
  public onTouched = (_?) => {};
  public registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
