import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';

import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,
        private logger: NGXLogger
        ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload();
            }

            const error = err.error.message || err.statusText;

            this.logError(error);

            return throwError(error);
        }));
    }

    logError(error: any) {
        this.logger.error(error);
    }
}
