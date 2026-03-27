import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SigninService } from '../../shared/services/signin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public signInForm: FormGroup;
  public message = '';

  constructor(private formBuilder: FormBuilder, private signinService: SigninService, private router: Router) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  public submitForm() {
    if (this.signInForm.valid) {
      this.signinService.signIn(this.signInForm.value.email, this.signInForm.value.password)
        .subscribe(user => {
            this.router.navigateByUrl('/admin/dashboard');
          },
          error => {
            this.message = 'Usuario inválido';
          });
    }
  }

  public formIsEmpty() {
    return this.signInForm.get('email').pristine || this.signInForm.get('password').pristine;
  }

  public emailIsValid() {
    return this.signInForm.get('email').dirty && !this.signInForm.get('email').errors;
  }
}
