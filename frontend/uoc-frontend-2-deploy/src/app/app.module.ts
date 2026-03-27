import {AppComponent} from './app.component';
import {CoreModule} from './shared/core.module';
import {FakeBackendService} from './shared/inmemory-db/fake-backend.service';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {SharedModule} from './shared/shared.module';
import {rootRouterConfig} from './app-routing';
import {StoreModule} from '@ngrx/store';
import * as fromRoot from './reducers/index';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {SigninModule} from './auth/signin/signin.module';
import {metaReducers} from './reducers';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
    imports: [
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        SharedModule,
        CoreModule,
        RouterModule.forRoot(rootRouterConfig,
            {useHash: false, initialNavigation: 'enabled', preloadingStrategy: PreloadAllModules}
        ),
        HttpClientModule,
        SigninModule,
        HttpClientInMemoryWebApiModule.forRoot(FakeBackendService, {
            dataEncapsulation: false
        }),
        StoreModule.forRoot(
            fromRoot.reducers,
            {
                metaReducers,
                runtimeChecks: {
                    strictStateImmutability: true,
                    strictActionImmutability: true,
                }
            }
        ),
        EffectsModule.forRoot(fromRoot.effects),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
        NoopAnimationsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
    ],
    declarations: [AppComponent],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
