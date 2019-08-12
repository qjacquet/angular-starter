import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-candidature-step-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  formPayment: FormGroup;
  currentUser: User;
  invoiceLines = [
    { title: 'Line 1', price: 16, icon: 'layers' },
    { title: 'Line 2', price: 30, icon: 'layers' },
    { title: 'Line 3', price: 18, icon: 'layers' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    this.formPayment = this.formBuilder.group({
      creditCardNumber: ['', Validators.required],
      creditCardSecret: ['', Validators.required],
      creditCardExpirationMonth: ['', Validators.required],
      creditCardExpirationYear: ['', Validators.required],
    });
  }

  @Input() candidatureForm: FormGroup;

  ngOnInit() {
  }

  get totalAmount() {
    let totalAmount = 0;
    this.invoiceLines.forEach(line => {
      totalAmount += line.price;
    });
    return totalAmount;
  }

}
