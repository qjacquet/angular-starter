import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, first } from 'rxjs/operators';
import { User } from '../models/user';
import { UserService } from './user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const TOKEN_NAME = environment.api.auth.token.name;
const USERID_NAME = environment.api.auth.token.userId;

const CURRENT_USER_NAME = 'currentUser';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(
        private http: HttpClient,
        private userService: UserService,
        private router: Router
    ) {
        this.currentUserSubject = new BehaviorSubject<User>(this.getCurrentUser());
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    /** Actions */

    login(username, password) {
        return this.http.post<any>(`${environment.api.auth.url}/auth/login`, { username, password })
            .pipe(map(token => {
                this.setToken(token[TOKEN_NAME]);
                this.userService.getById(this.getTokenUserId()).subscribe(u => {
                    this.setCurrentUser(u);
                });
            }));
    }

    register(user: any) {
        return this.http.post(`${environment.api.auth.url}/auth/register`, user);
    }

    logout() {
        this.removeToken();
        this.removeCurrentUser();
        this.router.navigate(['auth/login']);
    }

    /** Helpers */

    isLogged() {
        return this.getToken() && this.getCurrentUser() !== null;
    }

    getTokenUserId() {
        const jwtService = new JwtHelperService();
        return jwtService.decodeToken(this.getToken())[USERID_NAME];
    }

    private isExpiredToken(token: string) {
        return false;
    }

    /** Storage */

    private setToken(token) {
        localStorage.setItem(TOKEN_NAME, token);
    }

    private setCurrentUser(user) {
        localStorage.setItem(CURRENT_USER_NAME, JSON.stringify(user));
        this.currentUserSubject.next(user);
    }

    getToken(): string {
        const token = localStorage.getItem(TOKEN_NAME);

        if (token == null) {
            return null;
        }

        if (this.isExpiredToken(token)) {
            return null;
        }

        return token;
    }

    getCurrentUser(): User {
        return JSON.parse(localStorage.getItem(CURRENT_USER_NAME));
    }

    private removeToken() {
        localStorage.removeItem(TOKEN_NAME);
    }

    private removeCurrentUser() {
        localStorage.removeItem(CURRENT_USER_NAME);
        this.currentUserSubject.next(null);
    }
}
