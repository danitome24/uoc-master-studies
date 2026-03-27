import {Routes} from '@angular/router';

export const rootRouterConfig: Routes = [
    {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full'
    },
    {
        path: 'signin',
        loadChildren: () =>
            import('./signin/signin.module').then(m => m.SigninModule),
        data: {title: 'Signin'}
    },
    {
        path: 'forgot-password',
        loadChildren: () =>
            import('./forgot-password/forgot-password.module').then(
                m => m.ForgotPasswordModule
            ),
        data: {title: 'Forgot Password'}
    },
    {
        path: 'signup',
        loadChildren: () =>
            import('./signup/signup.module').then(m => m.SignupModule),
        data: {title: 'Signup'}
    },
];
