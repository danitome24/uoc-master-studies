import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SigninService} from './signin.service';
import {ProfileService} from 'src/app/shared/services/profile.service';
import {Store} from '@ngrx/store';
import {actions as SignInActions} from '../actions/auth.actions';
import * as fromAuth from '../reducers/auth.reducer';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    errorLogin = false;

    constructor(
        private signinService: SigninService,
        private profileService: ProfileService,
        private formBuilder: FormBuilder,
        private router: Router,
        private store: Store
    ) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.email, Validators.required]],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        this.submitted = true;
        this.store.dispatch(SignInActions.signIn({
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        }));
        this.store.select(fromAuth.selectAuthErrorOnLogin).subscribe((hasError) => {
            this.errorLogin = hasError;
        });
    }
}
