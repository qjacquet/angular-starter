import { Component, OnInit } from '@angular/core';
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
    { title: 'Exam', price: 16, icon: 'my_location' },
    { title: 'Hunter licence', price: 30, icon: 'card_membership' },
    { title: 'Useless things', price: 18, icon: 'layers' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;

    this.formPayment = this.formBuilder.group({
      creditCardNumber:           ['', Validators.required],
      creditCardSecret:           ['', Validators.required],
      creditCardExpirationMonth:  ['', Validators.required],
      creditCardExpirationYear:   ['', Validators.required],
    });
  }

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
