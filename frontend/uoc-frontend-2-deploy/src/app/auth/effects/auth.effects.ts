import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import * as fromAuth from '../actions/auth.actions';
import {SigninService} from '../signin/signin.service';
import {from} from 'rxjs';
import {User} from '../../shared/models/user.model';
import {Router} from '@angular/router';
import {ProfileService} from '../../shared/services/profile.service';
import {Store} from '@ngrx/store';
import {State} from '../../reducers/index';

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private signinService: SigninService, private router: Router,
                private profileService: ProfileService, private store$: Store<State>) {
    }

    // @ts-ignore
    login$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuth.SIGN_IN),
        switchMap(payload => {
            return from(this.signinService.login(payload));
        }),
        map((user: null | User) => {
            if (null == user) {
                return fromAuth.actions.signInFailed({});
            }
            return fromAuth.actions.signInSuccess({user});
        }),
    ));

    crudStudy$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuth.DELETE_STUDY, fromAuth.ADD_STUDY, fromAuth.UPDATE_STUDY, fromAuth.DELETE_LANGUAGE, fromAuth.ADD_LANGUAGE, fromAuth.UPDATE_LANGUAGE),
        withLatestFrom(this.store$),
        switchMap(([payload, state]) => {
            return from(this.profileService.updateProfile(state.auth.user));
        }),
    ), {dispatch: false});

    updateProfile$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuth.UPDATE_USER_PROFILE),
        switchMap((payload: { user: User }) => {
            return from(this.profileService.updateProfile(payload.user));
        }),
    ), {dispatch: false});

    // @ts-ignore

    loginSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuth.SIGN_IN_SUCCESS),
        map(() => {
            return this.router.navigate(['admin', 'dashboard']);
        })
    ), {dispatch: false});

    loginFailed$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuth.SIGN_IN_FAILED),
        map(() => {
            this.router.navigateByUrl('/');
        })),
        {dispatch: false}
    );
}
