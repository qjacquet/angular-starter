import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

export enum StorageMode {
    None = 0,
    Local = 1,
    Database = 2
}

const STORAGE_KEY = 'theme';
const DEFAULT_THEME = 'theme-default';
const DARK_VALUE = '-dark';

@Injectable()
export class ThemeService {

    storageMode: StorageMode;

    private themeClassSubject: BehaviorSubject<string>;
    public themeClass: Observable<string>;

    public get themeClassValue(): string {
        return this.themeClassSubject.value;
    }

    get isDark() {
        return this.get().includes(DARK_VALUE);
    }

    constructor() {
        this.storageMode = StorageMode.Local;

        this.init();
    }

    init() {
        this.themeClassSubject = new BehaviorSubject<string>(this.get());
        this.themeClass = this.themeClassSubject.asObservable();
    }

    set(themeClass: string) {
        this.save(themeClass);
        this.themeClassSubject.next(themeClass);
    }

    setReverse() {
        let theme;

        if (this.isDark) {
            theme = this.get().replace(DARK_VALUE, '');
        } else {
            theme = this.get() + DARK_VALUE;
        }

        this.set(theme);
    }

    private save(theme: string) {
        switch (this.storageMode) {
            case StorageMode.Local:
                localStorage.setItem(STORAGE_KEY, theme);
                break;
            default:
                break;
        }
    }

    private get(): string {
        switch (this.storageMode) {
            case StorageMode.Local:
                return localStorage.getItem(STORAGE_KEY) ? localStorage.getItem(STORAGE_KEY) : DEFAULT_THEME;
                break;
            default:
                break;
        }
    }
}
