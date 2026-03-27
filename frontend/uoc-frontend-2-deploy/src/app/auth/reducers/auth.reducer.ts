import {User} from '../../shared/models/user.model';
import {
    ADD_LANGUAGE,
    ADD_STUDY, ADD_WORK_EXPERIENCE, DELETE_LANGUAGE,
    DELETE_STUDY, DELETE_WORK_EXPERIENCE,
    FORGOT_PASSWORD_REQUEST,
    LOGOUT,
    SIGN_IN,
    SIGN_IN_FAILED,
    SIGN_IN_SUCCESS,
    UPDATE_LANGUAGE,
    UPDATE_STUDY,
    UPDATE_USER_PROFILE, UPDATE_WORK_EXPERIENCE
} from '../actions/auth.actions';
import {Auth} from '../../shared/models/auth.model';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface State {
    user: User | null;
    auth: Auth;
}

export const initialState: State = {
    user: null,
    auth: {
        errorOnLogin: false,
        loggedIn: false,
        forgottenPassword: false,
    },
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
            };

        case SIGN_IN_FAILED:
            return {
                ...state,
                auth: {
                    errorOnLogin: true,
                    loggedIn: false,
                    forgottenPassword: false
                }
            };

        case SIGN_IN_SUCCESS:
            return {
                ...state,
                user: action.user,
                auth: {
                    errorOnLogin: false,
                    loggedIn: true,
                    forgottenPassword: false
                }
            };
        case UPDATE_USER_PROFILE:
            const updatedUserProfile = {
                ...state.user,
                ...action.user
            };
            return {
                ...state,
                user: updatedUserProfile
            };
        case LOGOUT:
            return {
                ...initialState
            };
        case FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
                auth: {
                    errorOnLogin: false,
                    loggedIn: false,
                    forgottenPassword: true
                }
            };
        case ADD_LANGUAGE:
            const updatedUser = {
                ...state.user
            };
            updatedUser.languages = [
                ...state.user.languages,
                action.language
            ];
            return {
                ...state,
                user: updatedUser
            };
        case UPDATE_LANGUAGE:
            const updatedUserLang = {
                ...state.user
            };
            const languages = state.user.languages.filter(lang => lang.uid !== action.language.uid);
            const newLang = [
                ...languages,
                action.language
            ].sort((a, b) => {
                return a.uid - b.uid;
            });
            updatedUserLang.languages = newLang;
            return {
                ...state,
                user: updatedUserLang
            };
        case ADD_STUDY:
            const updatedUserStudy = {
                ...state.user
            };
            updatedUserStudy.studies = [
                ...state.user.studies,
                action.study
            ];
            return {
                ...state,
                user: updatedUserStudy
            };
        case UPDATE_STUDY:
            const updateUserStudy = {
                ...state.user
            };
            const studies = state.user.studies.filter(study => study.uid !== action.study.uid);
            const newStudy = [
                ...studies,
                action.study
            ].sort((a, b) => {
                return a.uid - b.uid;
            });
            updateUserStudy.studies = newStudy;
            return {
                ...state,
                user: updateUserStudy
            };
        case DELETE_STUDY:
            const newUser = {
                ...state.user
            };
            const newStudies = newUser.studies.filter(study => study.uid !== action.studyId);
            newUser.studies = [
                ...newStudies
            ];
            return {
                ...state,
                user: newUser
            };
        case DELETE_LANGUAGE:
            const newerUser = {
                ...state.user
            };
            const newLanguages = newerUser.languages.filter(lang => lang.uid !== action.languageId);
            newerUser.languages = [
                ...newLanguages
            ];
            console.log(newLanguages);
            return {
                ...state,
                user: newerUser
            };
        case ADD_WORK_EXPERIENCE:
            const user = {
                ...state.user
            };
            user.experiencies = [
                ...state.user.experiencies,
                action.experience
            ];
            return {
                ...state,
                user
            };
        case UPDATE_WORK_EXPERIENCE:
            const userWork = {
                ...state.user
            };
            const works = state.user.experiencies.filter(work => work.uid !== action.experience.uid);
            const newWork = [
                ...works,
                action.experience
            ].sort((a, b) => {
                return a.uid - b.uid;
            });
            userWork.experiencies = newWork;
            return {
                ...state,
                user: userWork
            };
        case DELETE_WORK_EXPERIENCE:
            const userD = {
                ...state.user
            };
            const newExperiences = userD.experiencies.filter(experience => experience.uid !== action.experienceId);
            userD.experiencies = [
                ...newExperiences
            ];
            return {
                ...state,
                user: userD
            };
        default:
            return state;
    }
}

// Selectors

export const selectAuthFeature = createFeatureSelector('auth');
export const selectAuthErrorOnLogin = createSelector(
    selectAuthFeature,
    (state: State) => state.auth.errorOnLogin
);
export const selectAuthIsLoggedIn = createSelector(
    selectAuthFeature,
    (state: State) => state.auth.loggedIn
);
export const selectForgottenPasswordRequested = createSelector(
    selectAuthFeature,
    (state: State) => state.auth.forgottenPassword
);

// Selectors
// TODO move this to profile module
export const selectUserProfile = createFeatureSelector('auth');
export const selectShowUserProfile = createSelector(
    selectUserProfile,
    (state: State) => state.user
);
export const selectSelectedLanguage = createSelector(
    selectUserProfile,
    (state: State, props: { langUid: number }) => {
        return state.user.languages.find(language => language.uid === props.langUid);
    }
);
export const selectNextUidLanguage = createSelector(
    selectUserProfile,
    (state: State) => {
        return state.user.languages.length + 1;
    }
);
export const selectNextUidExperience = createSelector(
    selectUserProfile,
    (state: State) => {
        return state.user.experiencies.length + 1;
    }
);
export const selectSelectedStudy = createSelector(
    selectUserProfile,
    (state: State, props: { studyId: number }) => state.user.studies.find(study => study.uid === props.studyId)
);
export const selectSelectedExperience = createSelector(
    selectUserProfile,
    (state: State, props: { experienceUid: number }) => state.user.experiencies.find(study => study.uid === props.experienceUid)
);
export const selectNextUidStudy = createSelector(
    selectUserProfile,
    (state: State) => {
        return state.user.studies.length + 1;
    }
);
