import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { StorageService, StorageMode } from './storage.service';

const STORAGE_KEY = 'theme';
const DARK_VALUE = '-dark';

@Injectable()
export class ThemeService {

    private themeClassSubject: BehaviorSubject<string>;
    public themeClass: Observable<string>;

    get theme(): string {
        return this.configService.configValue.theme;
    }

    get isDark() {
        return this.theme.includes(DARK_VALUE);
    }

    constructor(
        private configService: ConfigService
    ) {
        this.themeClassSubject = new BehaviorSubject<string>(this.theme);
        this.themeClass = this.themeClassSubject.asObservable();
    }

    setTheme(themeClass: string) {
        this.configService.configValue.theme = themeClass;
        this.configService.set(this.configService.configValue);
        this.themeClassSubject.next(themeClass);
    }

    setReverse() {
        let theme;

        if (this.isDark) {
            theme = this.theme.replace(DARK_VALUE, '');
        } else {
            theme = this.theme + DARK_VALUE;
        }

        this.setTheme(theme);
    }
}
