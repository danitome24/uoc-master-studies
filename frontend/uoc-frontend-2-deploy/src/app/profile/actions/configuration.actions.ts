import {createAction, props} from '@ngrx/store';

export const PREFERENCES_NOTIFICATIONS_UPDATE = '[Config Page] NotificationsUpdate';
export const PREFERENCES_LOCALE_UPDATE = '[Config Page] LocaleUpdate';

export const actions = {
    notificationsUpdate: createAction(
        PREFERENCES_NOTIFICATIONS_UPDATE,
        props<{ sendNotifications: boolean }>()
    ),
    localeUpdate: createAction(
        PREFERENCES_LOCALE_UPDATE,
        props<{ locale: { id: number, name: string, locale: string } }>()
    ),
};
