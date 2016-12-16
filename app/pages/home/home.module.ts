import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/platform';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import HomeService from './home.service';
import HomeComponent from './home.component';
import routes from './home.routing';
import SharedModule from '../../shared/shared.module';
import DatabaseService from '../../shared/api/database.service';


@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptRouterModule.forChild(routes),
        SharedModule,
    ],
    declarations: [
        HomeComponent,
    ],
    providers: [
        HomeService,
        DatabaseService,
    ],
    exports: [
        NativeScriptRouterModule,
    ],
    schemas: [NO_ERRORS_SCHEMA],
})
export default class HomeModule { }
