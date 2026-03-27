import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileService} from '../../../shared/services/profile.service';
import {CollegeStudy, Study, VocationalStudy} from 'src/app/shared/models/study.model';
import {MockData} from 'src/app/shared/mock-data';
import {select, Store} from '@ngrx/store';
import * as fromUser from '../../../auth/actions/auth.actions';
import * as fromUserReducer from '../../../auth/reducers/auth.reducer';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-profile-study',
    templateUrl: './profile-study.component.html',
    styleUrls: ['./profile-study.component.scss']
})
export class ProfileStudyComponent implements OnInit {
    studiesForm: FormGroup;
    options = MockData.TYPE_STUDIES;
    study: Study = {} as (VocationalStudy | CollegeStudy);
    public selectedStudy$: Observable<VocationalStudy | CollegeStudy>;
    public nextStudyId: number;
    public nextStudyId$: Observable<number>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private profileService: ProfileService,
        private store: Store
    ) {
        this.route.params.subscribe(params => {
            this.selectedStudy$ = this.store.pipe(
                select(fromUserReducer.selectSelectedStudy, {studyId: +params.uid})
            );
        });
        this.selectedStudy$.subscribe(study => {
            if (study != null) {
                this.study = study;
            }
        });
        this.studiesForm = new FormGroup({
            option: new FormControl(this.study?.level || '', [Validators.required])
        });
    }

    ngOnInit(): void {
        this.nextStudyId$ = this.store.pipe(
            select(fromUserReducer.selectNextUidStudy),
        );
        this.nextStudyId$.subscribe(nextUid => {
            this.nextStudyId = nextUid;
        });
    }

    compareOption(option1, option2) {
        return option1.uid === (option2 && option2.uid);
    }

    private update(study: VocationalStudy | CollegeStudy) {
        this.store.dispatch(fromUser.actions.updateStudy({study}));
        this.router.navigate(['/admin/profile']);
    }

    private save(study: VocationalStudy | CollegeStudy) {
        const newStudy = {
            ...study,
            uid: this.nextStudyId,
        };
        this.store.dispatch(fromUser.actions.addStudy({study: newStudy}));
        this.router.navigate(['/admin/profile']);
    }

    saveOrUpdate(study: VocationalStudy | CollegeStudy) {
        study.level = this.studiesForm.get('option').value;
        this.isNew() ? this.save(study) : this.update(study);
    }

    public isNew(): boolean {
        return !!!this.study.uid;
    }

    public isSelectVocational(): boolean {
        const value = this.studiesForm.get('option').value;
        return value && value.uid === MockData.TYPE_STUDIES[0].uid;
    }

    public isSelectUniversity(): boolean {
        const value = this.studiesForm.get('option').value;
        return value && value.uid === MockData.TYPE_STUDIES[1].uid;
    }

    public backProfile() {
        this.router.navigate(['/admin/profile']);
    }
}
