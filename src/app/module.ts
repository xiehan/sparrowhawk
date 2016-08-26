import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactNativeModule } from 'angular2-react-native';
import { StoreModule, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import DatabaseService from './api/database.service';
import FirebaseService from './api/firebase.service';
import FirebaseFakeService from './api/firebase-fake.service';
import flashCardsReducer from './flashcards/flashcards.reducer';
import mainReducer from './main/main.reducer';
import settingsReducer from './settings/settings.reducer';
import RouterComponent from './router.component';


@NgModule({
    declarations: [RouterComponent],
    imports: [
        ReactNativeModule,
        CommonModule,
        StoreModule.provideStore(compose(combineReducers)({
            main: mainReducer,
            settings: settingsReducer,
            flashCards: flashCardsReducer,
        })),
    ],
    providers: [FirebaseService, FirebaseFakeService, DatabaseService],
    bootstrap: [RouterComponent],
})
export default class SparrowhawkModule {
}
