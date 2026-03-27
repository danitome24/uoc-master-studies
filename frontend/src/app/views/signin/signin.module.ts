import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SigninRoutingModule } from './signin-routing.module';
import { SigninComponent } from './signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SigninService } from '../../shared/services/signin.service';

@NgModule({
  declarations: [SigninComponent],
  imports: [
    CommonModule,
    SigninRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    SigninService
  ]
})
export class SigninModule { }
