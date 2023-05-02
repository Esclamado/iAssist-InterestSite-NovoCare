import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
    private _accessToken$ = new BehaviorSubject<string>(null);

    accessToken$ = this._accessToken$.asObservable();

    constructor() {}

    setAccessToken(accessToken: string): void {
        this._accessToken$.next(accessToken);
    }
}
