import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import COLOR_PALETTE from '../constants/color-palette';
import FlashCardsService from './flashcards.service';
import flashCardsStylesheet from './flashcards.styles';
import IFlashCardsState from './flashcards.state';
import SingleFlashCardComponent from './single-card.component';
import CompletedScreenComponent from './completed-screen.component';


@Component({
    selector: 'flash-cards-container',
    providers: [FlashCardsService],
    directives: [SingleFlashCardComponent, CompletedScreenComponent],
    host: { position: 'relative' },
    // tslint:disable max-line-length
    template: `
<View [styleSheet]="styles.container">
    <View [styleSheet]="styles.loading" *ngIf="isLoading$ | async">
        <ActivityIndicator [color]="spinnerColor" size="large"></ActivityIndicator>
    </View>
    <flash-card *ngIf="!(isLoading$ | async) && !(hasCompletedAllCards$ | async)"
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
</View>
`, // tslint:enable max-line-length
})
export default class FlashCardsComponent implements OnInit {
    public styles: any;
    public spinnerColor: string = COLOR_PALETTE['dark-primary-color'];
    public isLoading$: Observable<boolean>;
    public wordTypeTranslationMap$: Observable<any>;
    public currentWord$: Observable<any>;
    public shouldShowDefinitionFirst$: Observable<boolean>;
    public shouldRevealCard$: Observable<boolean>;
    public hasCompletedAllCards$: Observable<boolean>;
    public missedWords$: Observable<Array<string>>;


    constructor(private service: FlashCardsService) {
        this.styles = flashCardsStylesheet;

        this.isLoading$ = service.state$.select((s: IFlashCardsState) => s.isLoading);
        this.wordTypeTranslationMap$ = service.state$
            .select((s: IFlashCardsState) => s.wordTypeTranslationMap);
        this.currentWord$ = service.state$.select((s: IFlashCardsState) => s.currentWord);
        this.shouldShowDefinitionFirst$ = service.state$
            .select((s: IFlashCardsState) => s.shouldShowDefinitionFirst);
        this.shouldRevealCard$ = service.state$.select((s: IFlashCardsState) => s.shouldRevealCard);
        this.hasCompletedAllCards$ = service.state$
            .select((s: IFlashCardsState) => s.hasCompletedAllCards);
        this.missedWords$ = service.state$.select((s: IFlashCardsState) => s.missedWords);
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
