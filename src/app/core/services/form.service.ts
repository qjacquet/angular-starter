import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

export enum StorageMode {
    Local = 1,
    Database = 2
}

@Injectable()
export class FormService {

    storageMode: StorageMode;

    constructor() {
        // Forms are saved in localStorage
        this.storageMode = StorageMode.Local;

        // Forms are saved in Database
        // this.storageMode = StorageMode.Database;
    }

    /**
     * Save form
     * @param id Must be uniqueId
     */
    saveForm(id: string, form: FormGroup) {
        switch (this.storageMode) {
            case StorageMode.Local:
                this.saveLocalStorageForm(id, form);
                break;
            default:
                break;
        }
    }

    /**
     * Get form
     * @param id Must be uniqueId
     */
    getForm(id: string) {
        switch (this.storageMode) {
            case StorageMode.Local:
                return this.getLocalStorageForm(id);
            default:
                break;
        }
    }

    /**
     * Set form
     */
    setForm(form: FormGroup, values: any) {
        form.setValue(values);
    }

    /**
     * Save form in localStorage
     */
    private saveLocalStorageForm(id: string, form: FormGroup) {
        console.log(Object.keys({form})[0]);
        localStorage.setItem(Object.keys({form})[0], JSON.stringify(form.value));
    }

    /**
     * Get form in localStorage
     */
    private getLocalStorageForm(id: string) {
        return JSON.parse(localStorage.getItem(id));
    }
}
