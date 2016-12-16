import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/platform';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import FlashCardsService from './flashcards.service';
import FlashCardsComponent from './flashcards.component';
import routes from './flashcards.routing';
import SingleFlashCardComponent from './cards/single-card.component';
import CompletedScreenComponent from './cards/completed-screen.component';
import SharedModule from '../../shared/shared.module';
import DatabaseService from '../../shared/api/database.service';


@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptRouterModule.forChild(routes),
        SharedModule,
    ],
    declarations: [
        FlashCardsComponent,
        SingleFlashCardComponent,
        CompletedScreenComponent,
    ],
    providers: [
        FlashCardsService,
        DatabaseService,
    ],
    exports: [
        NativeScriptRouterModule,
    ],
    schemas: [NO_ERRORS_SCHEMA],
})
export default class FlashCardsModule { }
