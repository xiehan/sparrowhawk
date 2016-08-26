import { Component, Input, Output, EventEmitter } from '@angular/core';
import COLOR_PALETTE from '../constants/color-palette';
import CardComponent, { ICardAction } from '../ui/card.component';


@Component({
    selector: 'flash-cards-completed',
    directives: [CardComponent],
    host: { position: 'relative' },
    // tslint:disable max-line-length
    template: `
<ui-card headerText="Congratulations" headerSubtext="You're done!"
         [headerBackgroundColor]="headerBackgroundColor"
         [cardActions]="actions">
    <Text [style]="{ paddingBottom: 8 }">You completed all of the cards in the current set.</Text>
    <View *ngIf="missedWords.length">
        <Text [style]="{ paddingBottom: 4 }">You missed the following words:</Text>
        <Text [style]="{ paddingTop: 4 }" *ngFor="let missedWord of missedWords">{{ missedWord }}</Text>
        <Text [style]="{ paddingTop: 8 }">Practice those and you'll do better next time!</Text>
    </View>
    <View *ngIf="!missedWords.length">
        <Text>You didn't miss any words! AMAZING!</Text>
        <Text [style]="{ paddingTop: 8 }">Maybe try a more advanced level next time.</Text>
    </View>
</ui-card>
`, // tslint:enable max-line-length
})
export default class CompletedScreenComponent {
    public actions: Array<ICardAction> = [];
    public headerBackgroundColor: string = COLOR_PALETTE['accent-color'];

    @Input() missedWords: Array<string>;

    @Output() startOver: EventEmitter<boolean> = new EventEmitter();
    @Output() goBack: EventEmitter<boolean> = new EventEmitter();


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
