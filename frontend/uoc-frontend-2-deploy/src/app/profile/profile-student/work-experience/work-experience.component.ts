import {Component, OnInit} from '@angular/core';
import {Experience} from '../../../shared/models/experience.model';
import {select, Store} from '@ngrx/store';
import * as fromUser from '../../../auth/actions/auth.actions';
import * as fromUserReducer from '../../../auth/reducers/auth.reducer';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-work-experience',
    templateUrl: './work-experience.component.html',
    styleUrls: ['./work-experience.component.scss']
})
export class WorkExperienceComponent implements OnInit {

    public experience: Experience = {} as Experience;
    public nextWorkUid$: Observable<number>;
    public selectedExperience$: Observable<Experience>;
    public nextWorkUid: number;

    constructor(private store: Store, private router: Router, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.selectedExperience$ = this.store.pipe(
                select(fromUserReducer.selectSelectedExperience, {experienceUid: +params.uid})
            );
        });
    }

    ngOnInit(): void {
        this.nextWorkUid$ = this.store.pipe(
            select(fromUserReducer.selectNextUidExperience)
        );
        this.nextWorkUid$.subscribe(nextUid => {
            this.nextWorkUid = nextUid;
        });
    }

    addOrUpdateExperience(experience: Experience) {
        experience.uid ? this.update(experience) : this.save(experience);
    }

    private update(experience: Experience) {
        this.store.dispatch(fromUser.actions.updateWorkExperience({experience}));
        this.router.navigate(['/admin/profile']);
    }

    private save(experience: Experience) {
        const newWorkExperience = {
            ...experience,
            uid: this.nextWorkUid,
        };
        this.store.dispatch(fromUser.actions.addWorkExperience({experience: newWorkExperience}));
        this.router.navigate(['/admin/profile']);
    }
}
