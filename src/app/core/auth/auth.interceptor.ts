import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return this.authService.accessToken$.pipe(
            first(),
            switchMap((accessToken) => {
                if (accessToken) {
                    req = req.clone({
                        headers: req.headers.set(
                            'Authorization',
                            'ExternalServicesToken ' + accessToken
                        )
                    });
                }

                return next.handle(req);
            })
        );
    }
}
