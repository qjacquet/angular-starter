import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';

import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

const ERROR_MESSAGE_KEY = 'message';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,
        private logger: NGXLogger,
        private route: Router
        ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {

            // Log error
            this.logError(err);

            // Error message
            let error = JSON.stringify(err[ERROR_MESSAGE_KEY]);

            if (err.status === 401 && this.authenticationService.isLogged()) {
                this.authenticationService.logout();
                // Error message on 401
                error = 'Expired session. Please reconnect.';
                this.route.navigate(['auth/login']);
            }

            return throwError(error);
        }));
    }

    logError(error: any) {
        this.logger.error(error);
    }
}
