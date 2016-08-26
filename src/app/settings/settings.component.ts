import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import COLOR_PALETTE from '../constants/color-palette';
import ButtonComponent from '../ui/button.component';
import SettingsService from './settings.service';
import settingsStylesheet from './settings.styles';
import ISettingsState from './settings.state';


@Component({
    selector: 'settings-menu',
    providers: [SettingsService],
    directives: [ButtonComponent],
    host: { position: 'relative' },
    // tslint:disable max-line-length
    template: `
<View [styleSheet]="styles.container">
    <View [styleSheet]="styles.rowContainer">
        <Text [styleSheet]="styles.label">Include:</Text>
        <View [styleSheet]="styles.row" *ngFor="let wordType of (availableWordTypes$ | async)">
            <Text [styleSheet]="styles.rowText">
                {{wordType.nativeLabel}} ({{wordType.settingsLabel}})
            </Text>
            <Switch [onTintColor]="uiElementColor" (change)="toggleIncludeType(wordType.wordType)"></Switch>
        </View>
    </View>
    <View [styleSheet]="styles.rowContainer">
        <View [styleSheet]="styles.row">
            <View [styleSheet]="styles.rowText">
                <Text>How many cards?</Text>
                <Text [styleSheet]="styles.cardCount">{{ numberOfCards$ | async }}</Text>
            </View>
            <Slider minimumValue="5" maximumValue="100" step="1"
                    [value]="numberOfCards$ | async"
                    [minimumTrackTintColor]="uiElementColor"
                    [style]="{ width: 180 }"
                    (valueChange)="setNumberOfCards($event)">
            </Slider>
        </View>
    </View>
    <View [styleSheet]="styles.rowContainer" [style]="{ height: 160 }">
        <View [styleSheet]="styles.row">
            <Text [styleSheet]="styles.rowText">
                Auto-advance speed
            </Text>
            <Picker prompt="Please select a duration" 
                    [selectedValue]="autoAdvanceSpeed$ | async"
                    [items]="autoAdvanceSpeeds"
                    [style]="{ width: 180 }" 
                    (select)="setAutoAdvanceSpeed($event)">
            </Picker>
        </View>
    </View>
    <View [styleSheet]="styles.rowContainer">
        <View [styleSheet]="styles.row">
            <ui-button [backgroundColor]="transparent"
                       [textColor]="buttonColor"
                       (tap)="goBack()">
                BACK
            </ui-button>
            <ui-button [backgroundColor]="buttonColor"
                       [enabled]="atLeastOneWordTypeSelected$ | async" 
                       (tap)="start()">
                START
            </ui-button>
        </View>
    </View>
</View>
`, // tslint:enable max-line-length
})
export default class SettingsComponent implements OnInit {
    public styles: any;
    public buttonColor: string = COLOR_PALETTE['dark-primary-color'];
    public uiElementColor: string = COLOR_PALETTE['accent-color'];
    public autoAdvanceSpeeds: Array<any> = [
        { label: 'No auto-advance', value: 0 },
        { label: '3 seconds', value: 3 },
        { label: '5 seconds', value: 5 },
        { label: '7 seconds', value: 7 },
        { label: '10 seconds', value: 10 },
    ];

    public availableWordTypes$: Observable<any>;
    public atLeastOneWordTypeSelected$: Observable<boolean>;
    public numberOfCards$: Observable<number>;
    public autoAdvanceSpeed$: Observable<number>;


    constructor(private service: SettingsService) {
        this.styles = settingsStylesheet;

        this.availableWordTypes$ = service.state$
            .select((s: ISettingsState) => s.availableWordTypes);
        this.numberOfCards$ = service.state$.select((s: ISettingsState) => s.numberOfCards);
        this.autoAdvanceSpeed$ = service.state$.select((s: ISettingsState) => s.autoAdvanceSpeed);

        // see comment in SettingsService for why this isn't in application state
        this.atLeastOneWordTypeSelected$ = service.atLeastOneWordTypeSelected$;
    }

    public ngOnInit(): void {
        this.service.initialize();
    }

    public toggleIncludeType(wordType: string): void {
        this.service.toggleInclusionOfWordType(wordType);
    }

    public setNumberOfCards(numberOfCards: number): void {
        this.service.setNumberOfCards(numberOfCards);
    }

    public setAutoAdvanceSpeed(index: number): void {
        this.service.setAutoAdvanceSpeed(this.autoAdvanceSpeeds[index].value);
    }

    public start(): void {
        this.service.start();
    }

    public goBack(): void {
        this.service.goBack();
    }
}
