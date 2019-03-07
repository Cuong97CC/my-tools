import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class ProgressBarService {
  private storageSub = new Subject();

  constructor() { }

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  show() {
    this.storageSub.next(true);
  }

  hide() {
    this.storageSub.next(false);
  }
}
