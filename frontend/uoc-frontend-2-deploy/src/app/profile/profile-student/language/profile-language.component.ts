import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Language} from '../../../shared/models/language.model';
import * as fromUserReducer from '../../../auth/reducers/auth.reducer';
import * as fromUser from '../../../auth/actions/auth.actions';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-profile-language',
    templateUrl: './profile-language.component.html',
    styleUrls: ['./profile-language.component.scss']
})
export class ProfileLanguageComponent implements OnInit {
    language: Language = {} as Language;
    public selectedLanguage$: Observable<Language>;
    public nextLangUid$: Observable<number>;
    public nextLangUid: number;

    constructor(
        private route: ActivatedRoute,
        private store: Store,
        private router: Router
    ) {
        this.route.params.subscribe(params => {
            this.selectedLanguage$ = this.store.pipe(
                select(fromUserReducer.selectSelectedLanguage, {langUid: +params.uid})
            );
        });
    }

    ngOnInit(): void {
        this.nextLangUid$ = this.store.pipe(
            select(fromUserReducer.selectNextUidLanguage),
        );
        this.nextLangUid$.subscribe(nextUid => {
            this.nextLangUid = nextUid;
        });
    }

    public saveOrUpdate(language: Language) {
        language.uid ? this.update(language) : this.save(language);
    }

    private save(language: Language) {
        const newLang = {
            ...language,
            uid: this.nextLangUid,
        };
        this.store.dispatch(fromUser.actions.addLanguage({language: newLang}));
        this.router.navigate(['/admin/profile']);
    }

    private update(language: Language) {
        this.store.dispatch(fromUser.actions.updateLanguage({language}));
        this.router.navigate(['/admin/profile']);
    }
}
