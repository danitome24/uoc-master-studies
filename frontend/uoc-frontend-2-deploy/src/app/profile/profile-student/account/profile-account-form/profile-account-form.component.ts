import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DocumentType, Municipe, Province, User} from '../../../../shared/models/user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {dateValidator} from '../../../../shared/directives/date-validator.directive';
import {documentNumberValidator} from '../../../../shared/directives/document-number-validator.directive';
import {MockData} from '../../../../shared/mock-data';

@Component({
    selector: 'app-profile-account-form',
    templateUrl: './profile-account-form.component.html',
    styleUrls: ['./profile-account-form.component.scss']
})
export class ProfileAccountFormComponent implements OnInit {
    public rForm: FormGroup;
    @Input() userProfile: User;
    @Output() updateUser: EventEmitter<User> = new EventEmitter<User>();
    public documentsType: DocumentType[];
    public municipes: Municipe[];
    public provinces: Province[];

    constructor() {
    }

    ngOnInit(): void {
        this.loadSelectProperties();
        this.loadFormInstance();
    }

    public compareByUID(option1, option2) {
        return option1.uid === (option2 && option2.uid);
    }

    public loadSelectProperties(): void {
        this.documentsType = MockData.DOCUMENTS_TYPE;
        this.municipes = MockData.MUNICIPES;
        this.provinces = MockData.PROVINCES;
    }

    public loadFormInstance(): void {
        this.rForm = new FormGroup(
            {
                name: new FormControl(this.userProfile.name, [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(55),
                    Validators.pattern(/^[a-zA-Z]+$/)
                ]),
                surname: new FormControl(this.userProfile.surname, [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(55),
                    Validators.pattern(/^[a-zA-Z]+$/)
                ]),
                phone: new FormControl(this.userProfile.phone, [
                    Validators.pattern(/^[0-9]{6,}$/),
                    Validators.required
                ]),
                phone2: new FormControl(this.userProfile.phone2, [
                    Validators.pattern(/^[0-9]{6,}$/),
                    Validators.required
                ]),

                birthdate: new FormControl(this.userProfile.birthdate, [
                    Validators.required,
                    dateValidator()
                ]),
                documentType: new FormControl(this.userProfile.documentType, [
                    Validators.required
                ]),
                documentNumber: new FormControl(this.userProfile.documentNumber, [
                    Validators.required
                ]),
                street: new FormControl(this.userProfile.address.street, [
                    Validators.required
                ]),
                municipe: new FormControl(this.userProfile.address.municipe, [
                    Validators.required
                ]),
                province: new FormControl(this.userProfile.address.province, [
                    Validators.required
                ]),
                aboutMe: new FormControl(this.userProfile.aboutMe),
                otherCompetences: new FormControl(this.userProfile.aboutMe),
                license: new FormControl(this.userProfile.license)
            },
            documentNumberValidator()
        );
    }

    public update() {
        if (this.rForm.valid) {
            const userUpdated = {
                ...this.userProfile,
                ...this.rForm.value
            };
            this.updateUser.emit(userUpdated);
        }
    }
}
