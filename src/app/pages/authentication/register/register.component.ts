import { AlertService } from '../../../core/services/alert.service';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../../core/services/dialog.service';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private dialogService: DialogService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.show('Registration successful');
                    this.router.navigate(['/']);
                },
                error => {
                    this.alertService.show(error);
                    this.loading = false;
                });
    }
}
