import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/platform';

import CardComponent from './card.component';
import CardHeaderComponent from './card-header.component';


@NgModule({
    imports: [
        NativeScriptModule,
    ],
    declarations: [
        CardComponent,
        CardHeaderComponent,
    ],
    exports: [
        CardComponent,
    ],
    schemas: [NO_ERRORS_SCHEMA],
})
export default class UiModule { }
