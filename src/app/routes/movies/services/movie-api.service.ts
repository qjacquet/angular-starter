import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MovieApiService {

    url: string;
    key: string;

    constructor(
        private http: HttpClient
    ) {
        console.log(environment);
        this.url = environment.api.movies.url + environment.api.movies.version + '/';
        this.key = environment.api.movies.key;
     }

    getAll(params: string, page: number) {
        return this.http.get(this.url + 'discover/movie?api_key=' + this.key + params + '&page=' + page);
    }

    getImage(path: string) {
        return 'https://image.tmdb.org/t/p/w300' + path;
    }
}
