import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import * as fromUser from '../../auth/reducers/auth.reducer';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs/internal/Observable';
import {Study} from '../../shared/models/study.model';
import {Language} from '../../shared/models/language.model';

export class LanguagesDatasource implements DataSource<Language> {

    private userSubject = new BehaviorSubject<Language[]>([]);
    private loadingUser = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingUser.asObservable();

    constructor(private store: Store) {
    }


    connect(collectionViewer: CollectionViewer): Observable<Language[]> {
        return this.userSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.userSubject.complete();
        this.loadingUser.complete();
    }

    loadLanguages() {

        this.loadingUser.next(true);

        this.store.pipe(
            select(fromUser.selectShowUserProfile)
        ).subscribe(user => this.userSubject.next(user.languages));
    }
}
