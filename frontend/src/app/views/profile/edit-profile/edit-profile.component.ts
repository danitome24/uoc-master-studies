import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../../../shared/services/user-store';
import { DocumentType, nextLanguageId, nextStudyId, User } from '../../../shared/models/user.model';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserApiService } from '../../../shared/services/backend-api/user-api.service';
import { CollegeStudy, VocationalStudy } from '../../../shared/models/study.model';
import { Language } from '../../../shared/models/language.model';
import { nifValidator, passportValidator } from '../../../shared/validators/document/nif.validator';
import { AppSettings } from '../../../shared/app.settings';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  public user: User;
  public editProfileForm: FormGroup;
  public showEditCollegeStudyForm = false;
  public editCollegeStudyForm: FormGroup = null;
  public newVocationalStudyForm: FormGroup = null;
  public newCollegeStudyForm: FormGroup = null;
  public showEditVocationalStudyForm = false;
  public editVocationalStudyForm: FormGroup = null;
  public editLanguageForm: FormGroup = null;
  public newLanguageForm: FormGroup = null;
  public nieTypes = [
    { uid: 0, name: 'Otro' },
    { uid: 1, name: 'NIF' },
    { uid: 2, name: 'Pasaporte' }
  ];
  public provinces = AppSettings.PROVINCES;
  public municipes = AppSettings.MUNICIPES;
  public levels = [
    { uid: 1, name: 'Ciclo Formativo' },
    { uid: 2, name: 'Título universitario' },
    { uid: 3, name: 'Otro título' }
  ];
  public allInstitutions = [
    { uid: 1, name: 'Centro Laboral de Tarragona' },
    { uid: 2, name: 'IES Politécnico Jesús Marin' }
  ];
  public allCategories = [
    { uid: 1, name: 'Física y Química' },
    { uid: 2, name: 'Informática y comunicaciones' }
  ];
  public allGrades = [
    { uid: 1, name: 'Ciclo Formativo Grado Medio' },
    { uid: 3, name: 'Ciclo Formativo Grado Superior' }
  ];
  public allLanguageLevels = AppSettings.STUDENT_LANGUAGE_LEVELS;
  public allLanguages = AppSettings.STUDENT_LANGUAGES;
  private nameValidators = [
    Validators.minLength(3),
    Validators.maxLength(55),
    Validators.required,
    Validators.pattern('^[^\\s][\\s{1}a-zA-z]+[^\\s]$')
  ];
  private surnameValidators = [
    Validators.minLength(3),
    Validators.maxLength(55),
    Validators.required,
    Validators.pattern('^[^\\s][\\s{1}a-zA-z]+[^\\s]$')
  ];
  public showNewVocationalStudyForm = false;
  public showNewCollegeStudyForm = false;
  public showEditLanguageForm = false;
  public showNewLanguageForm = false;

  constructor(private activedRoute: ActivatedRoute,
              private userService: UserApiService,
              private userStore: UserStoreService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activedRoute.data.subscribe(((user: { user: User }) => {
      this.user = user.user;
    }));
    this.createEditUserForm();
  }

  // Validators
  public isInvalidByRequired(formControlName: string): boolean {
    const control = this.editProfileForm.get(formControlName);
    return control.dirty && control.hasError('required');
  }

  public hasGoodLength(formControlName: string) {
    const control = this.editProfileForm.get(formControlName);
    return control.dirty && (control.hasError('minlength') || control.hasError('maxlength'));
  }

  public hasNoSpecialChars(formControlName: string) {
    const control = this.editProfileForm.get(formControlName);
    return control.dirty && (control.hasError('pattern'));
  }

  public onlyNumbers(formControlName: string) {
    const control = this.editProfileForm.get(formControlName);
    return control.dirty && (control.hasError('pattern'));
  }

  public isString(formControlName: string) {
    const control = this.editProfileForm.get(formControlName);
    return control.dirty && (control.hasError('pattern'));
  }

  public isNifInvalid(): ValidationErrors {
    const control = this.editProfileForm.get('documentNumber');
    return control?.dirty && control.errors;
  }

  // Forms creation
  private createEditUserForm() {
    this.editProfileForm = this.fb.group({
      id: [this.user.id],
      name: [this.user.name, this.nameValidators],
      surname: [this.user.surname, this.surnameValidators],
      birthdate: [this.user.birthdate],
      phone: [this.user.phone, [Validators.pattern('^\\d+$')]],
      phone2: [this.user.phone2, [Validators.pattern('^\\d+$')]],
      documentType: [this.user.documentType],
      documentNumber: [this.user.documentNumber],
      address: this.fb.group({
        street: [this.user.address.street, [Validators.pattern('^.+$')]],
        province: [this.user.address.province, [Validators.pattern('^.+$')]],
        municipe: [this.user.address.municipe, [Validators.pattern('^.+$')]]
      }),
      license: [this.user.license],
      aboutMe: [this.user.aboutMe],
      otherCompetencies: [this.user.otherCompetences]
    });
    this.editProfileForm.get('documentType').valueChanges.subscribe((documentType: DocumentType) => {
      if (documentType.uid === 1) {
        this.editProfileForm.get('documentNumber').setValidators(nifValidator);
      } else if (documentType.uid === 2) {
        this.editProfileForm.get('documentNumber').setValidators(passportValidator);
      }
      this.editProfileForm.updateValueAndValidity();
    });
  }

  private createEditCollegeStudyForm(study: CollegeStudy) {
    this.showEditCollegeStudyForm = true;
    this.editCollegeStudyForm = this.fb.group({
      uid: [study.uid],
      level: [study.level],
      title: [study.title],
      certificate: [study.certificate],
      date: [study.date],
      bilingue: [study.bilingue],
      institution: [study.institution]
    });
  }

  private createEditVocationalStudyForm(study: VocationalStudy) {
    this.showEditVocationalStudyForm = true;
    this.editVocationalStudyForm = this.fb.group({
      uid: [study.uid],
      level: [study.level],
      institution: [study.institution],
      title: [study.title],
      category: [study.category],
      grade: [study.grade],
      date: [study.date],
      dual: [study.dual],
      bilingue: [study.bilingue],
      certificate: [study.certificate]
    });
  }

  private createNewVocationalForm() {
    this.newVocationalStudyForm = this.fb.group({
      uid: [nextStudyId(this.user)],
      level: this.fb.group({
        uid: [1],
        name: ['Ciclo Formativo']
      }),
      institution: [],
      title: [],
      category: [],
      grade: [],
      date: [],
      dual: [],
      bilingue: [false],
      certificate: [false]
    });
  }

  private createNewCollegeForm() {
    this.newCollegeStudyForm = this.fb.group({
      uid: [nextStudyId(this.user)],
      level: this.fb.group({
        uid: [2],
        name: ['Título universitario']
      }),
      title: [],
      certificate: [false],
      date: [],
      bilingue: [false],
      institution: []
    });
  }

  private createEditLanguageForm(language: Language) {
    this.editLanguageForm = this.fb.group({
      uid: [language.uid],
      level: [language.level],
      name: [language.name],
      date: [language.date]
    });
  }

  public createNewLanguageForm() {
    this.showNewLanguageForm = true;
    this.newLanguageForm = this.fb.group({
      uid: [nextLanguageId(this.user)],
      level: [],
      name: [],
      date: []
    });
  }

  // Submit forms
  public submitEditUser() {
    if (this.editProfileForm.valid) {
      const updatedProfile = {
        ...this.user,
        ...this.editProfileForm.value
      };
      this.userService.updateUser(updatedProfile)
        .subscribe(data => {
          this.editProfileForm.patchValue(updatedProfile);
        });
      this.router.navigate(['admin', 'profile']);
    }
  }

  public submitEditStudy() {
    if (this.editVocationalStudyForm.valid) {
      this.showEditVocationalStudyForm = false;
      this.userService.updateUserStudy(this.user, this.editVocationalStudyForm.value)
        .subscribe(user => console.log('User updated'));
    }
  }

  public submitNewVocationalStudy() {
    if (this.newVocationalStudyForm.valid) {
      this.showNewVocationalStudyForm = false;
      this.user.studies.push(this.newVocationalStudyForm.value);
      this.userService.updateUser(this.user).subscribe(user => console.log('User updated'));
    }
  }

  public submitNewCollegeStudy() {
    if (this.newCollegeStudyForm.valid) {
      this.showNewCollegeStudyForm = false;
      this.user.studies.push(this.newCollegeStudyForm.value);
      this.userService.updateUser(this.user)
        .subscribe(user => console.log('User updated'));
    }
  }

  public submitEditLanguage() {
    if (this.editLanguageForm.valid) {
      this.showEditLanguageForm = false;
      this.userService.updateLanguage(this.user, this.editLanguageForm.value)
        .subscribe(user => console.log('User updated'));
    }
  }

  public submitEditCollege() {
    if (this.editCollegeStudyForm.valid) {
      this.showEditCollegeStudyForm = false;
      this.userService.updateUserStudy(this.user, this.editCollegeStudyForm.value)
        .subscribe(user => console.log('User updated'));
    }
  }

  public submitNewLanguage() {
    if (this.newLanguageForm.valid) {
      this.showNewLanguageForm = false;
      this.user.languages.push(
        this.newLanguageForm.value
      );
      this.userService.updateUser(this.user)
        .subscribe(user => console.log('User updated'));
    }
  }

  // Actions
  public removeStudy(uid: number) {
    this.userService.removeStudyFromUser(this.user, uid)
      .subscribe(data => {
      });
  }

  public editStudy(study) {

    if (study.level.uid === 2) {
      this.createEditCollegeStudyForm(study);
    } else if (study.level.uid === 1) {
      this.createEditVocationalStudyForm(study);
    }
  }

  public removeLanguage(uid: number) {
    this.user.languages = this.user.languages.filter(language => language.uid !== uid);
    this.userService.updateUser(this.user);
  }

  public editLanguage(language: Language) {
    this.showEditLanguageForm = true;
    this.createEditLanguageForm(language);
  }

  // "Form state"
  public showVocationalForm() {
    this.showNewVocationalStudyForm = true;
    this.createNewVocationalForm();
  }

  public showCollegeForm() {
    this.showNewCollegeStudyForm = true;
    this.createNewCollegeForm();
  }

  // Helper methods
  public cancelNewStudy() {
    this.showNewVocationalStudyForm = false;
    this.showNewCollegeStudyForm = false;
  }

  public sameUuid(optOne, optTwo) {
    return optOne.uid === optTwo.uid;
  }
}
