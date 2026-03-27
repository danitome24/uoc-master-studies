import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {dateValidator} from '../../../../shared/directives/date-validator.directive';
import {MockData} from '../../../../shared/mock-data';
import {Language, LanguageLevel, LanguageName} from 'src/app/shared/models/language.model';

@Component({
    selector: 'app-profile-language-form',
    templateUrl: './profile-language-form.component.html',
    styleUrls: ['./profile-language-form.component.scss']
})
export class ProfileLanguageFormComponent implements OnInit {

    public langForm: FormGroup;
    public languageLevels: LanguageLevel[];
    public languageNames: LanguageName[];
    @Input() language: Language;
    @Output() submitForm: EventEmitter<Language> = new EventEmitter<Language>();

    constructor() {
    }

    ngOnInit(): void {
        this.loadFormInstance();
        this.loadSelectProperties();
    }

    public loadFormInstance(): void {
        this.langForm = new FormGroup({
            uid: new FormControl(this.language.uid),
            level: new FormControl(this.language.level, [Validators.required]),
            name: new FormControl(this.language.name, [Validators.required]),
            date: new FormControl(this.language.date, [
                Validators.required,
                dateValidator()
            ])
        });
    }

    public loadSelectProperties(): void {
        this.languageLevels = MockData.LANGUAGES_LEVEL;
        this.languageNames = MockData.LANGUAGES_NAME;
    }

    public compareLevel(option1, option2) {
        return option1.uid === (option2 && option2.uid);
    }

    public compareName(option1, option2) {
        return option1.uid === (option2 && option2.uid);
    }

    public submit() {
        const language = {
            ...this.langForm.value
        };
        this.submitForm.emit(language);
    }
}
