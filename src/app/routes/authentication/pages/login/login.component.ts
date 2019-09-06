import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../../core/ui/alert/alert.service';
import { AuthenticationService } from '../../../../core/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../../../core/ui/dialog/dialog.service';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private dialogService: DialogService,
    private alertService: AlertService
  ) {

  }

  ngOnInit() {

    if (this.authenticationService.isLogged()) {
      this.router.navigate(['/']);
    }

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.alertService.show('Please fill the fields', 'Ok');
      return;
    }

    this.authenticationService.login(this.f.email.value, this.f.password.value)
    .pipe(first())
    .subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.alertService.show('Username or password not valid', 'Ok');
      });
  }
}
