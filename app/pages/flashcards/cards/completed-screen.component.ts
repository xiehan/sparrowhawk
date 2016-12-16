import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ICardAction } from '../../../shared/ui/card.component';


@Component({
    selector: 'flash-cards-completed',
    // tslint:disable max-line-length
    template: `
<ui-card headerText="Congratulations" headerSubtext="You're done!"
         [cardActions]="actions">
     <StackLayout orientation="vertical" minHeight="100">
        <Label style="padding-bottom: 8;" textWrap="true" text="You completed all of the cards in the current set."></Label>
        <StackLayout orientation="vertical" *ngIf="missedWords.length">
            <Label style="padding-bottom: 4;" textWrap="true" text="You missed the following words:"></Label>
            <Label style="padding-top: 4;" *ngFor="let missedWord of missedWords" [text]="missedWord"></Label>
            <Label style="padding-top: 8;" textWrap="true" text="Practice those and you'll do better next time!"></Label>
        </StackLayout>
        <StackLayout orientation="vertical" *ngIf="!missedWords.length">
            <Label textWrap="true" text="You didn't miss any words! AMAZING!"></Label>
            <Label style="padding-top: 8;" textWrap="true" text="Maybe try a more advanced level next time."></Label>
        </StackLayout>
    </StackLayout>
</ui-card>
`, // tslint:enable max-line-length
})
export default class CompletedScreenComponent {
    public actions: Array<ICardAction> = [];

    @Input() missedWords: Array<string>;

    @Output() startOver: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() goBack: EventEmitter<boolean> = new EventEmitter<boolean>();


    constructor() {
        const startOverAction: ICardAction = {
            text: 'Start Over',
            callback: this.doStartOver.bind(this),
        };
        const goBackAction: ICardAction = {
            text: 'Back',
            callback: this.doGoBack.bind(this),
        };
        this.actions.push(startOverAction);
        this.actions.push(goBackAction);
    }

    private doStartOver(): void {
        this.startOver.emit(true);
    }

    private doGoBack(): void {
        this.goBack.emit(true);
    }
}
