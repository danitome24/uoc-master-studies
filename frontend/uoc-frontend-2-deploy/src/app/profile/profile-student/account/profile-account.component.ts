import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from 'src/app/shared/models/user.model';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as fromUserState from '../../../auth/reducers/auth.reducer';
import * as fromUser from '../../../auth/actions/auth.actions';

@Component({
    selector: 'app-profile-account',
    templateUrl: './profile-account.component.html',
    styleUrls: ['./profile-account.component.scss']
})
export class ProfileAccountComponent implements OnInit {
    public user$: Observable<User>;

    constructor(private router: Router, private store: Store) {
    }

    ngOnInit() {
        this.loadUserProfile();
    }

    private loadUserProfile() {
        this.user$ = this.store.pipe(
            select(fromUserState.selectShowUserProfile)
        );
    }

    updateUser($event: User) {
        this.store.dispatch(fromUser.actions.updateUserProfile({user: $event}));
        this.router.navigate(['/admin/profile']);
    }
}
