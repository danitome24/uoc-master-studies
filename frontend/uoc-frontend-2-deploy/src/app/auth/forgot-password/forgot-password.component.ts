import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import * as fromUser from '../actions/auth.actions';
import * as fromUserReducer from '../reducers/auth.reducer';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

    public forgottenPasswordForm: FormGroup;
    public isForgottenPasswordRequested$;

    constructor(private formBuilder: FormBuilder, private store: Store) {
    }

    ngOnInit() {
        this.forgottenPasswordForm = this.formBuilder.group({
            email: ['', [Validators.email, Validators.required]]
        });
    }

    onSubmit() {
        this.store.dispatch(fromUser.actions.forgotPasswordRequest({email: this.forgottenPasswordForm.value}));
        this.isForgottenPasswordRequested$ = this.store.pipe(
            select(fromUserReducer.selectForgottenPasswordRequested)
        );
    }
}
