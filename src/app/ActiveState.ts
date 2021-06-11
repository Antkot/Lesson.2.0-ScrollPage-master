/* 3rd party modules */
import {OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {mapTo, takeUntil} from 'rxjs/operators';

const __ON_DESTROY__ = Symbol('ngOnDestroy');
const __ON_INIT__ = Symbol('ngOnInit');
const __ON_CHANGES__ = Symbol('ngOnChanges');

/**
 * Class that monitors component lifecycle
 */
export class AliveState implements OnDestroy, OnInit, OnChanges {
  protected readonly ngOnInit$: Observable<void>;
  protected readonly ngOnDestroy$: Observable<void>;
  protected readonly ngOnChanges$: Observable<SimpleChanges>;

  constructor() {
    this[__ON_INIT__] = new Subject();
    this[__ON_DESTROY__] = new Subject();
    this[__ON_CHANGES__] = new Subject();

    this.ngOnInit$ = this[__ON_INIT__].asObservable();
    this.ngOnDestroy$ = this[__ON_DESTROY__].asObservable();
    this.ngOnChanges$ = this[__ON_CHANGES__].asObservable();
  }

  public ngOnInit(): void {
    this[__ON_INIT__].next();
  }

  /**
   * Trigger ngOnDestroy$ event when an element is destroyed
   */
  public ngOnDestroy(): void {
    this[__ON_DESTROY__].next();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this[__ON_CHANGES__].next(changes);
  }

  /**
   * Subscribe the observable and automatically cancel subscription when element is destroyed
   */
  protected subscribeWhileAlive(...subjects: Array<Observable<any>>): Promise<any> {
    subjects.forEach((subject) => subject.pipe(takeUntil(this[__ON_DESTROY__])).subscribe());
    return this[__ON_DESTROY__].pipe(mapTo(true)).toPromise();
  }
}
