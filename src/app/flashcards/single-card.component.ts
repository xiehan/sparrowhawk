import { Component, Input, Output, EventEmitter } from '@angular/core';
import COLOR_PALETTE from '../constants/color-palette';
import CardComponent, { ICardAction } from '../ui/card.component';


@Component({
    selector: 'flash-card',
    directives: [CardComponent],
    host: { position: 'relative' },
    // tslint:disable max-line-length
    template: `
<ui-card *ngIf="!shouldRevealCard && shouldShowDefinitionFirst"
         [headerText]="currentWord.alternateType || currentWord.type"
         [headerSubtext]="wordTypeTranslationMap[currentWord.alternateType || currentWord.type]"
         [headerBackgroundColor]="headerBackgroundColor"
         [cardActions]="notYetRevealedActions"
         (swiperight)="doRevealCard()"
         (swipeup)="doRevealCard()">
    <Text>{{ currentWord.definition }}</Text>
</ui-card>
<ui-card *ngIf="!shouldRevealCard && !shouldShowDefinitionFirst"
         [headerText]="currentWord.display"
         [headerSubtext]="currentWord.commonConjugation || currentWord.hanja"
         [headerBackgroundColor]="headerBackgroundColor"
         [cardActions]="notYetRevealedActions"
         (swiperight)="doRevealCard()"
         (swipeup)="doRevealCard()">
    <Text [style]="{ fontStyle: 'italic' }">
        {{ currentWord.subtype }} {{ currentWord.type }}
        <Text *ngIf="currentWord.alternateType">, {{ currentWord.alternateType }}</Text>
    </Text>
</ui-card>
<ui-card *ngIf="shouldRevealCard"
         [headerText]="currentWord.display"
         [headerSubtext]="currentWord.commonConjugation || currentWord.hanja"
         [headerBackgroundColor]="headerBackgroundColor"
         [cardActions]="revealedActions"
         (swiperight)="doAdvanceCard()"
         (swipeup)="doAdvanceCard()">
    <Text>{{ currentWord.definition }}</Text>
    <Text [style]="{ fontStyle: 'italic', paddingTop: 8 }">
        {{ currentWord.subtype }} {{ currentWord.type }}
        <Text *ngIf="currentWord.alternateType">, {{ currentWord.alternateType }}</Text>
    </Text>
    <Text [style]="{ paddingTop: 8 }" *ngIf="currentWord.regular === false">
        {{ currentWord.irregularType }} (irregular {{currentWord.type}})
    </Text>
    <Text [style]="{ paddingTop: 16 }" *ngIf="currentWord.hanja && !currentWord.commonConjugation">
        Hanja: {{ currentWord.hanja }}
    </Text>
</ui-card>
`, // tslint:enable max-line-length
})
export default class SingleFlashCardComponent {
    public headerBackgroundColor: string = COLOR_PALETTE['default-primary-color'];
    public notYetRevealedActions: Array<ICardAction> = [];
    public revealedActions: Array<ICardAction> = [];

    @Input() wordTypeTranslationMap: any;
    @Input() currentWord: any;
    @Input() shouldShowDefinitionFirst: boolean;
    @Input() shouldRevealCard: boolean;

    @Output() revealCard: EventEmitter<boolean> = new EventEmitter();
    @Output() advanceCard: EventEmitter<boolean> = new EventEmitter();


    constructor() {
        const revealCardAction: ICardAction = {
            text: 'Reveal',
            callback: this.doRevealCard.bind(this),
        };
        this.notYetRevealedActions.push(revealCardAction);

        const advanceCardWithWordCorrect: ICardAction = {
            text: 'Got it',
            callback: this.doAdvanceCard.bind(this, false),
        };
        const advanceCardWithWordIncorrect: ICardAction = {
            text: 'I missed it',
            callback: this.doAdvanceCard.bind(this, true),
        };
        this.revealedActions.push(advanceCardWithWordCorrect);
        this.revealedActions.push(advanceCardWithWordIncorrect);
    }

    public doRevealCard(): void {
        this.revealCard.emit(true);
    }

    public doAdvanceCard(selfReportedMissedWord?: boolean): void {
        this.advanceCard.emit(selfReportedMissedWord || false);
    }
}
