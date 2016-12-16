import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/platform';

import DatabaseService from './database.service';
import FirebaseService from './firebase.service';
import FirebaseFakeService from './firebase-fake.service';


@NgModule({
    imports: [
        NativeScriptModule,
    ],
    providers: [
        FirebaseService,
        FirebaseFakeService,
        DatabaseService,
    ],
    schemas: [NO_ERRORS_SCHEMA],
})
export default class ApiModule { }
