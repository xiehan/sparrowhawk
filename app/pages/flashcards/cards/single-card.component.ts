import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ICardAction } from '../../../shared/ui/card.component';


@Component({
    selector: 'flash-card',
    // tslint:disable max-line-length
    template: `
<ui-card *ngIf="!shouldRevealCard && shouldShowDefinitionFirst"
         [headerText]="currentWord.alternateType || currentWord.type"
         [headerSubtext]="wordTypeTranslationMap[currentWord.alternateType || currentWord.type]"
         [cardActions]="notYetRevealedActions"
         (swipe)="doRevealCard()">
    <StackLayout orientation="vertical" minHeight="100">
        <Label textWrap="true" [text]="currentWord.definition"></Label>
    </StackLayout>
</ui-card>
<ui-card *ngIf="!shouldRevealCard && !shouldShowDefinitionFirst"
         [headerText]="currentWord.display"
         [headerSubtext]="currentWord.commonConjugation || currentWord.hanja"
         [cardActions]="notYetRevealedActions"
         (swipe)="doRevealCard()">
    <StackLayout orientation="vertical" minHeight="100">
        <StackLayout orientation="horizontal" class="font-italic">
            <Label *ngIf="currentWord.subtype" [text]="currentWord.subtype + ' '"></Label>
            <Label [text]="currentWord.type"></Label>
            <Label *ngIf="currentWord.alternateType"
                   [text]="', ' + currentWord.alternateType">
            </Label>
        </StackLayout>
    </StackLayout>
</ui-card>
<ui-card *ngIf="shouldRevealCard"
         [headerText]="currentWord.display"
         [headerSubtext]="currentWord.commonConjugation || currentWord.hanja"
         [cardActions]="revealedActions"
         (swipe)="doAdvanceCard()">
    <StackLayout orientation="vertical" minHeight="100">
        <Label textWrap="true" [text]="currentWord.definition"></Label>
        <StackLayout orientation="horizontal" class="font-italic" style="padding-top: 8;">
            <Label *ngIf="currentWord.subtype" [text]="currentWord.subtype + ' '"></Label>
            <Label [text]="currentWord.type"></Label>
            <Label *ngIf="currentWord.alternateType"
                   [text]="', ' + currentWord.alternateType">
            </Label>
        </StackLayout>
        <Label style="padding-top: 8;" 
               [text]="currentWord.irregularType + ' (irregular ' + currentWord.type + ')'"
               *ngIf="currentWord.regular === false">
        </Label>
        <Label class="footnote" style="padding-top: 16;" 
               [text]="'Hanja: ' + currentWord.hanja"
               *ngIf="!!currentWord.commonConjugation && currentWord.hanja">
        </Label>
    </StackLayout>
</ui-card>
`, // tslint:enable max-line-length
})
export default class SingleFlashCardComponent {
    public notYetRevealedActions: Array<ICardAction> = [];
    public revealedActions: Array<ICardAction> = [];

    @Input() wordTypeTranslationMap: any;
    @Input() currentWord: any;
    @Input() shouldShowDefinitionFirst: boolean;
    @Input() shouldRevealCard: boolean;

    @Output() revealCard: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() advanceCard: EventEmitter<boolean> = new EventEmitter<boolean>();


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
