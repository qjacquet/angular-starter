import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../../services/form.service';

const selector = 'app-search';

@Component({
    selector,
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    form: FormGroup;
    @Output() searchedText = new EventEmitter<string>();

    constructor(
        private formService: FormService,
        private formBuilder: FormBuilder
    ) {
        this.form = this.formBuilder.group({
            value: ['', null]
        });
    }

    ngOnInit(): void {
        this.formService.set(selector, new Array(this.form));
    }
}
