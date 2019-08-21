import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from 'src/app/core/services/form.service';

@Component({
  selector: 'app-candidature-step-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.scss']
})
export class DisclaimerComponent implements OnInit {

  formDisclaimer: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService
  ) {
    this.formDisclaimer = this.formBuilder.group({
      accept: ['', Validators.requiredTrue]
    });
  }

  ngOnInit() {
  }

}
