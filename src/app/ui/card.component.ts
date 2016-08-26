import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { StyleSheet } from 'react-native';
import COLOR_PALETTE from '../constants/color-palette';
import CardHeaderComponent from './card-header.component';
import ButtonComponent from './button.component';


export interface ICardAction {
    text: string;
    callback: () => void;
}


@Component({
    selector: 'ui-card',
    directives: [CardHeaderComponent, ButtonComponent],
    // tslint:disable max-line-length
    template: `
<View [styleSheet]="styleSheet.container">
    <ui-card-header *ngIf="headerImage || headerText"
                    [image]="headerImage"
                    [text]="headerText"
                    [subtext]="headerSubtext"
                    [backgroundColor]="headerBackgroundColor">
    </ui-card-header>
    <View [styleSheet]="styleSheet.image" *ngIf="contentImage">
        <Image [source]="contentImage"></Image>
    </View>
    <View [styleSheet]="styleSheet.content">
        <ng-content></ng-content>
    </View>
    <View [styleSheet]="styleSheet.actions" *ngIf="cardActions">
        <ui-button *ngFor="let cardAction of cardActions" 
                   [backgroundColor]="transparent"
                   [textColor]="buttonColor"
                   [raised]="false"
                   (tap)="cardAction.callback()">
            {{ cardAction.text | uppercase }}
        </ui-button>
    </View>
</View>
`, // tslint:enable max-line-length
})
export default class CardComponent implements OnInit, OnChanges {
    public styleSheet: any;
    public buttonColor: string = COLOR_PALETTE['accent-color'];

    @Input() headerImage: any;
    @Input() headerText: string;
    @Input() headerSubtext: string;
    @Input() headerBackgroundColor: string = 'transparent';
    @Input() contentImage: any;
    @Input() cardActions: Array<ICardAction>;


    constructor() {
        this.updateStyles();
    }

    public ngOnInit(): void {
        this.updateStyles();
    }

    public ngOnChanges(): void {
        this.updateStyles();
    }

    private updateStyles(): void {
        this.styleSheet = StyleSheet.create({
            container: {
                // width: 100,
                padding: 0,
                margin: 16,
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'stretch',
                backgroundColor: '#ffffff',
                borderRadius: 2,
                shadowColor: 'rgba(0, 0, 0, 0.12)',
                shadowOpacity: 0.8,
                shadowRadius: 2,
                shadowOffset: {
                    height: 1,
                    width: 2,
                },
                elevation: 4,
                color: 'black',
                textAlign: 'left',
                textAlignVertical: 'center',
            },
            content: {
                // flex: 3,
                padding: 16,
                color: 'black',
                fontSize: 14,
            },
            actions: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderStyle: 'solid',
                borderTopColor: 'rgba(0, 0, 0, 0.1)',
                borderTopWidth: 1,
                paddingVertical: 8,
            },
        });

        if (this.headerBackgroundColor === COLOR_PALETTE['accent-color']) {
            this.buttonColor = COLOR_PALETTE['default-primary-color'];
        }
    }
}
