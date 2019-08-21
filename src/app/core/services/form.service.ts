import { Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export enum StorageMode {
    None = 0,
    Local = 1,
    Database = 2
}

@Injectable()
export class FormService {

    storageMode: StorageMode;
    form: FormGroup;
    selector: string;

    /**
     * Current step
     */
    step: number;

    constructor(
        private formBuilder: FormBuilder,
    ) {
        // Forms are saved in localStorage
        this.storageMode = StorageMode.Local;

        // Forms are saved in Database
        // this.storageMode = StorageMode.Database;
    }


    /**
     * Set the current Form
     *
     * @param id Id
     * @param form Array of FormGroup
     */
    set(id: string, form: FormGroup[]) {
        const iterator = form.keys();

        const array = [];
        for (const key of iterator) {
            array[key] = form[key];
        }

        this.selector = id;
        this.form = this.formBuilder.group(array);

        // Load saved form
        if (this.get() !== null) {
            this.load();
        }
    }

    /**
     * Save form
     */
    save(step?: number) {
        switch (this.storageMode) {
            case StorageMode.Local:
                localStorage.setItem(this.selector, JSON.stringify(this.form.value));
                step ? localStorage.setItem(this.selector + '-step', step.toString()) : localStorage.setItem(this.selector + '-step', '0');
                break;
            default:
                break;
        }
    }

    /**
     * Load stored form and set
     */
    load() {
        const values = this.get();
        if (values != null) {
            this.form.setValue(values);
        }
        this.step = this.getStep();
    }

    /**
     * Delete saved form
     * @param id Must be uniqueId
     */
    deleteSave() {
        switch (this.storageMode) {
            case StorageMode.Local:
                localStorage.removeItem(this.selector);
                localStorage.removeItem(this.selector + '-step');
                break;
            default:
                break;
        }
    }

    /**
     * Get form step
     */
    private getStep() {
        switch (this.storageMode) {
            case StorageMode.Local:
                return localStorage.getItem(this.selector + '-step') ? parseInt(localStorage.getItem(this.selector + '-step'), 10) : 0;
            default:
                break;
        }
    }

    /**
     * Get form values
     */
    private get() {
        switch (this.storageMode) {
            case StorageMode.Local:
                return JSON.parse(localStorage.getItem(this.selector));
            default:
                break;
        }
    }

}
