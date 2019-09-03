import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { Subject } from 'rxjs';

const selector = 'app-search';

@Component({
    selector,
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    constructor(
    ) {

    }

    ngOnInit(): void {
    }
}
