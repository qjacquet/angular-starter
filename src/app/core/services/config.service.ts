import { appConfig, Config } from '../config/config';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

const STORAGE_KEY = 'config';

@Injectable()
export class ConfigService extends StorageService {

    private configSubject: BehaviorSubject<Config>;
    public config: Observable<Config>;

    public get configValue(): Config {
        return this.configSubject.value;
    }

    constructor() {
        super();

        this.storageId = STORAGE_KEY;

        this.init();
    }

    init() {
        // Init from appConfig
        if (this.get() == null) {
            this.storageValue = appConfig;
            this.save();
        }
        this.configSubject = new BehaviorSubject<Config>(this.get() as Config);
        this.config = this.configSubject.asObservable();
    }

    set(config: Config) {
        this.storageId = STORAGE_KEY;
        this.storageValue = config;
        this.save();
        this.configSubject.next(config);
    }
}
