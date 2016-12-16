import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/platform';

import ApiModule from './api/api.module';
import CardComponent from './ui/card.component';
import UiModule from './ui/ui.module';


@NgModule({
    imports: [
        NativeScriptModule,
        ApiModule,
        UiModule,
    ],
    exports: [
        CardComponent,
    ],
    schemas: [NO_ERRORS_SCHEMA],
})
export default class SharedModule { }
