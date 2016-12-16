import { Component, Input } from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';
import COLOR_PALETTE from '../constants/color-palette';

registerElement('CardView', () => require('nativescript-cardview').CardView);


export interface ICardAction {
    text: string;
    callback: () => void;
}


@Component({
    selector: 'ui-card',
    // tslint:disable max-line-length
    template: `
<CardView radius="2">
    <StackLayout orientation="vertical" backgroundColor="white" borderRadius="2">
        <ui-card-header *ngIf="headerImage || headerText"
                        [image]="headerImage"
                        [text]="headerText"
                        [subtext]="headerSubtext"
                        [backgroundColor]="headerBackgroundColor">
        </ui-card-header>
        <StackLayout orientation="vertical" *ngIf="contentImage">
            <Image [src]="contentImage"></Image>
        </StackLayout>
        <StackLayout orientation="vertical" class="body" style="padding: 16;">
            <ng-content></ng-content>
        </StackLayout>
        <StackLayout class="hr-light" *ngIf="cardActions"></StackLayout>
        <StackLayout orientation="horizontal" *ngIf="cardActions">
            <Button class="btn text-uppercase font-weight-bold"
                    style="color: #D32F2F;"
                    *ngFor="let cardAction of cardActions" 
                    [text]="cardAction.text"
                    [color]="buttonColor"
                    (tap)="cardAction.callback()">
            </Button>
        </StackLayout>
    </StackLayout>
</CardView>
`, // tslint:enable max-line-length
})
export default class CardComponent {
    public headerBackgroundColor: string = COLOR_PALETTE['accent-color'];
    public buttonColor: string = COLOR_PALETTE['default-primary-color']; // @TODO don't hard-code this

    @Input() headerImage: any;
    @Input() headerText: string;
    @Input() headerSubtext: string;
    @Input() contentImage: any;
    @Input() cardActions: Array<ICardAction>;
}
