import {Component, OnInit} from '@angular/core';
import {AppSettings} from '../../shared/app.settings';
import {select, Store} from '@ngrx/store';
import * as fromConfig from '../reducers/configuration.reducer';
import * as fromConfigActions from '../actions/configuration.actions';

@Component({
    selector: 'app-configuration',
    templateUrl: './configuration.component.html',
    styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

    public availableAppLanguages;
    public sendNotifications$;
    public localeSelected$;

    constructor(private store: Store) {
    }

    ngOnInit(): void {
        this.availableAppLanguages = AppSettings.APP_LOCALES;
        this.sendNotifications$ = this.store.pipe(
            select(fromConfig.selectConfigurationSendNotifications),
        );
        this.localeSelected$ = this.store.pipe(
            select(fromConfig.selectConfigurationAppLocale),
        );
    }

    updateNotifications(event) {
        console.log(event);
        const sendNotifications = event.checked;
        this.store.dispatch(fromConfigActions.actions.notificationsUpdate({sendNotifications}));
    }

    updateAppLocale(event) {
        const selectedLocale = AppSettings.APP_LOCALES.find((locale) => {
            return locale.id == event.value;
        });
        this.store.dispatch(fromConfigActions.actions.localeUpdate({locale: selectedLocale}));
    }
}
