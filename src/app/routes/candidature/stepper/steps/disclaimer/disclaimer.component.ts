import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-candidature-step-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.scss']
})
export class DisclaimerComponent implements OnInit {

  formDisclaimer: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.formDisclaimer = this.formBuilder.group({
      accept: ['', Validators.requiredTrue]
    });
  }

  ngOnInit() {
  }

}
