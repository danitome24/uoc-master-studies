import {AppSettings} from '../../shared/app.settings';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromConfig from '../actions/configuration.actions';

export interface State {
    app_locale: { id, name, locale };
    notifications: boolean;
}

export const initialState: State = {
    app_locale: AppSettings.APP_DEFAULT_MOMENT_LOCALE,
    notifications: false
};

// Reducer
export function reducer(state = initialState, action) {
    switch (action.type) {
        case fromConfig.PREFERENCES_NOTIFICATIONS_UPDATE:
            return {
                ...state,
                notifications: action.sendNotifications
            };
        case fromConfig.PREFERENCES_LOCALE_UPDATE:
            return {
                ...state,
                app_locale: action.locale
            };
        default:
            return state;
    }
}

// Selectors
export const selectConfigurationFeature = createFeatureSelector('preferences');

export const selectConfigurationAppLocale = createSelector(
    selectConfigurationFeature,
    (state: State) => state.app_locale
);

export const selectConfigurationSendNotifications = createSelector(
    selectConfigurationFeature,
    (state: State) => state.notifications
);
