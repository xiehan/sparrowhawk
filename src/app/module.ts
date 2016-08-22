import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactNativeModule } from 'angular2-react-native';
import DatabaseService from './api/database.service';
import FirebaseService from './api/firebase.service';
import HelloAppComponent from './hello/hello';


@NgModule({
    declarations: [HelloAppComponent],
    imports: [ReactNativeModule, CommonModule],
    providers: [FirebaseService, DatabaseService],
    bootstrap: [HelloAppComponent],
})
export default class SparrowhawkModule {
}
