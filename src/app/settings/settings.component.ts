import { Component, OnInit } from '@angular/core';
import { LocationStrategy } from '@angular/common';
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
    <Text [styleSheet]="styles.label">Include:</Text>
    <View [styleSheet]="styles.row" *ngFor="let wordType of (availableWordTypes$ | async)">
        <Text [styleSheet]="styles.rowText">
            {{wordType.nativeLabel}} ({{wordType.settingsLabel}})
        </Text>
        <Switch [onTintColor]="switchColor" (change)="toggleIncludeType(wordType.wordType)"></Switch>
    </View>
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
`, // tslint:enable max-line-length
})
export default class SettingsComponent implements OnInit {
    public styles: any;
    public buttonColor: string = COLOR_PALETTE['dark-primary-color'];
    public switchColor: string = COLOR_PALETTE['accent-color'];
    public availableWordTypes$: Observable<any>;
    public atLeastOneWordTypeSelected$: Observable<boolean>;


    constructor(private locationStrategy: LocationStrategy, private service: SettingsService) {
        this.styles = settingsStylesheet;

        this.availableWordTypes$ = service.state$
            .select((s: ISettingsState) => s.availableWordTypes);

        // see comment in SettingsService for why this isn't in application state
        this.atLeastOneWordTypeSelected$ = service.atLeastOneWordTypeSelected$;
    }

    public ngOnInit(): void {
        this.service.initialize();
    }

    public toggleIncludeType(wordType: string): void {
        this.service.toggleInclusionOfWordType(wordType);
    }

    public start(): void {
        this.service.start();
    }

    public goBack(): void {
        this.locationStrategy.back();
    }
}
