import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {User} from '../../shared/models/user.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { finalize } from 'rxjs/internal/operators/finalize';
import * as fromUser from '../../auth/reducers/auth.reducer';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import {Study} from '../../shared/models/study.model';

export class StudyDatasource implements DataSource<Study> {

    private userSubject = new BehaviorSubject<Study[]>([]);
    private loadingUser = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingUser.asObservable();

    constructor(private store: Store) {
    }


    connect(collectionViewer: CollectionViewer): Observable<Study[]> {
        return this.userSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.userSubject.complete();
        this.loadingUser.complete();
    }

    loadStudies() {

        this.loadingUser.next(true);

        this.store.pipe(
            select(fromUser.selectShowUserProfile)
        ).subscribe(user => this.userSubject.next(user.studies));
    }
}
