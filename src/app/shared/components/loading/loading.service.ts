import { Subject } from 'rxjs';
import { LoadingType } from './loading.type';
import { startWith } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn : 'root'
})
export class LoadingService {
    private loadingSubject = new Subject<LoadingType>();

    getLoanding() {
        return this.loadingSubject
            .asObservable()
            .pipe(startWith(LoadingType.STOPPED));
    }

    start() {
        this.loadingSubject.next(LoadingType.LOADING);
    }

    stop() {
        this.loadingSubject.next(LoadingType.STOPPED);
    }
}