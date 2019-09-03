import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(
        private http: HttpClient
    ) { }

    getAll() {
        return this.http.get<User[]>(`${environment.api.auth.url}/users`);
    }

    delete(id: number) {
        return this.http.delete(`${environment.api.auth.url}/users/${id}`);
    }

    update(user: User) {
        return this.http.put(`${environment.api.auth.url}/users/${user.id}`, user);
    }

    getUserAvatar(user: User) {
        return user.profile.avatarBase64;
    }
}
