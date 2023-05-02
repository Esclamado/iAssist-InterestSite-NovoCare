import { Injectable } from '@angular/core';
import { AbvDebug, Benefit } from 'flex-start';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AbvService {
    private _benefitSubject = new BehaviorSubject<Benefit>(null);
    private _flexStartCompletedSubject$ = new BehaviorSubject<boolean>(false);
    private _debug$ = new BehaviorSubject<AbvDebug>(null);

    benefit$ = this._benefitSubject.asObservable();
    isFlexStartCompleted$ = this._flexStartCompletedSubject$.asObservable();
    debug$ = this._debug$.asObservable();

    constructor() {}

    setBenefit(benefit: Benefit): void {
        this._benefitSubject.next(benefit);
    }

    setFlexStartCompleted(flexStartCompleted: boolean): void {
        this._flexStartCompletedSubject$.next(flexStartCompleted);
    }

    setDebug(debug: AbvDebug): void {
        this._debug$.next(debug);
    }
}
