import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {rootRouterConfig} from './auth-routing';
import {SigninService} from './signin/signin.service';
import {ForgotPasswordModule} from './forgot-password/forgot-password.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ForgotPasswordModule,
        RouterModule.forChild(rootRouterConfig),
    ],
    providers: [SigninService]
})
export class AuthModule {
}
