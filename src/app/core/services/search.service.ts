import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable()
export class SearchService {
    baseUrl: string;
    queryUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = 'https://api.cdnjs.com/libraries';
        this.queryUrl = '?search=';
    }

    search(terms: Observable<string>) {
        return terms.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(term => this.searchEntries(term)));
    }

    searchEntries(term) {
        return this.http
            .get(this.baseUrl + this.queryUrl + term)
            .pipe(map((response: any) => response.json()));
    }
}