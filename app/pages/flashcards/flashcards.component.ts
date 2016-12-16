import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import COLOR_PALETTE from '../../shared/constants/color-palette';
import capitalize from '../../shared/utils/capitalize-string';
import FlashCardsService from './flashcards.service';
import IFlashCardsState from './flashcards.state';


@Component({
    selector: 'flash-cards-container',
    // tslint:disable max-line-length
    template: `
<ActionBar color="black"
           [backgroundColor]="actionBarColor"
           [title]="selectedLanguage$ | async">
    <NavigationButton text="Back" (tap)="goBack()"></NavigationButton>
</ActionBar>
<FlexboxLayout flexDirection="column" alignItems="stretch" alignContent="center" justifyContent="center"
               class="p-20" [backgroundColor]="backgroundColor">
    <StackLayout orientation="vertical" *ngIf="isLoading$ | async">
        <ActivityIndicator class="activity-indicator" width="200" height="200" color="white">
        </ActivityIndicator>
    </StackLayout>
    <StackLayout orientation="vertical" *ngIf="!(isLoading$ | async)">
        <flash-card *ngIf="!(hasCompletedAllCards$ | async)"
                    [wordTypeTranslationMap]="wordTypeTranslationMap$ | async"
                    [currentWord]="currentWord$ | async"
                    [shouldShowDefinitionFirst]="shouldShowDefinitionFirst$ | async"
                    [shouldRevealCard]="shouldRevealCard$ | async"
                    (revealCard)="revealCard($event)"
                    (advanceCard)="advanceCard($event)">
        </flash-card>
        <flash-cards-completed *ngIf="hasCompletedAllCards$ | async"
                               [missedWords]="missedWords$ | async"
                               (startOver)="startOver($event)"
                               (goBack)="goBack($event)">
        </flash-cards-completed>
    </StackLayout>
</FlexboxLayout>
`, // tslint:enable max-line-length
})
export default class FlashCardsComponent implements OnInit {
    public actionBarColor: string = COLOR_PALETTE['dark-primary-color'];
    public backgroundColor: string = '#d7d2cb';

    public isLoading$: Observable<boolean>;
    public selectedLanguage$: Observable<string>;
    public wordTypeTranslationMap$: Observable<any>;
    public currentWord$: Observable<any>;
    public shouldShowDefinitionFirst$: Observable<boolean>;
    public shouldRevealCard$: Observable<boolean>;
    public hasCompletedAllCards$: Observable<boolean>;
    public missedWords$: Observable<Array<string>>;


    constructor(private service: FlashCardsService) {
        this.isLoading$ = service.state$.map((s: IFlashCardsState) => s.isLoading);
        this.selectedLanguage$ = service.state$
            .map((s: IFlashCardsState) => capitalize(s.selectedLanguage));
        this.wordTypeTranslationMap$ = service.state$
            .map((s: IFlashCardsState) => s.wordTypeTranslationMap);
        this.currentWord$ = service.state$.map((s: IFlashCardsState) => s.currentWord);
        this.shouldShowDefinitionFirst$ = service.state$
            .map((s: IFlashCardsState) => s.shouldShowDefinitionFirst);
        this.shouldRevealCard$ = service.state$.map((s: IFlashCardsState) => s.shouldRevealCard);
        this.hasCompletedAllCards$ = service.state$
            .map((s: IFlashCardsState) => s.hasCompletedAllCards);
        this.missedWords$ = service.state$.map((s: IFlashCardsState) => s.missedWords);
    }

    public ngOnInit(): void {
        this.service.initialize();
    }

    public revealCard(): void {
        this.service.revealFlashCard();
    }

    public advanceCard(selfReportedMissedWord?: boolean): void {
        this.service.advanceFlashCard(selfReportedMissedWord);
    }

    public startOver(): void {
        this.service.startOver();
    }

    public goBack(): void {
        this.service.goBack();
    }
}
