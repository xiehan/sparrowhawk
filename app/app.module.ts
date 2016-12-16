import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { compose } from '@ngrx/core/compose';
import { StoreModule, combineReducers } from '@ngrx/store';
import { NativeScriptModule } from 'nativescript-angular/platform';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import AppComponent from './app.component';
import routes from './app.routing';
import FlashCardsModule from './pages/flashcards/flashcards.module';
import flashCardsReducer from './pages/flashcards/flashcards.reducer';
import HomeModule from './pages/home/home.module';
import homeReducer from './pages/home/home.reducer';
import SettingsModule from './pages/settings/settings.module';
import settingsReducer from './pages/settings/settings.reducer';


@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(routes),
        StoreModule.provideStore(compose(combineReducers)({
            main: homeReducer,
            settings: settingsReducer,
            flashCards: flashCardsReducer,
        })),
        FlashCardsModule,
        HomeModule,
        SettingsModule,
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA],
})
export default class AppModule { }
