import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/platform';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import SettingsService from './settings.service';
import SettingsComponent from './settings.component';
import routes from './settings.routing';
import SharedModule from '../../shared/shared.module';
import DatabaseService from '../../shared/api/database.service';


@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptRouterModule.forChild(routes),
        SharedModule,
    ],
    declarations: [
        SettingsComponent,
    ],
    providers: [
        SettingsService,
        DatabaseService,
    ],
    exports: [
        NativeScriptRouterModule,
    ],
    schemas: [NO_ERRORS_SCHEMA],
})
export default class SettingsModule { }
