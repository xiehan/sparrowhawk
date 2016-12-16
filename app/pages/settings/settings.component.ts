import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Color } from 'color';

import COLOR_PALETTE from '../../shared/constants/color-palette';
import capitalize from '../../shared/utils/capitalize-string';
import SettingsService from './settings.service';
import ISettingsState from './settings.state';


@Component({
    selector: 'settings-menu',
    // tslint:disable max-line-length
    template: `
<ActionBar color="black"
           [backgroundColor]="actionBarColor"
           [title]="selectedLanguage$ | async">
    <NavigationButton android.systemIcon="ic_menu_back" text="Back" (tap)="goBack()"></NavigationButton>
    <ActionItem ios.position="right" android.position="actionBar" (tap)="start()">
        <Label text="Start" class="action-bar-right-btn"
               [color]="(atLeastOneWordTypeSelected$ | async) ? 'black' : actionBarDisabledTextColor">
        </Label>
    </ActionItem>
</ActionBar>
<TabView>
    <StackLayout class="p-20" *tabItem="{title: 'Pick Words'}">
        <Label class="label" text="Include:"></Label>
        <FlexboxLayout flexDirection="row" alignContent="center" alignItems="center" justifyContent="space-between" 
                       *ngFor="let wordType of (availableWordTypes$ | async)">
            <Label class="body" [text]="wordType.nativeLabel + ' ' + wordType.settingsLabel"></Label>
            <Switch class="switch"
                    [checked]="wordType.shouldInclude"
                    (checkedChange)="toggleIncludeType(wordType.wordType)">
            </Switch>
        </FlexboxLayout>
    </StackLayout>
    <StackLayout orientation="vertical" *tabItem="{title: 'Other Settings'}">
        <StackLayout orientation="vertical" class="p-20">
            <Label class="label" text="How many cards?"></Label>
            <Slider #slider class="slider"
                    minValue="5" maxValue="100" step="1"
                    [value]="numberOfCards$ | async"
                    (valueChange)="setNumberOfCards(slider.value)">
            </Slider>
            <Label class="body text-center" [text]="numberOfCards$ | async"></Label>
        </StackLayout>
        <StackLayout orientation="vertical" class="p-20">
            <Label class="label p-b-20" textWrap="true" text="Auto-advance speed"></Label>
            <ListPicker #picker height="140"
                        [items]="autoAdvanceSpeedLabels"
                        [selectedIndex]="autoAdvanceSpeed$ | async"
                        (selectedIndexChange)="setAutoAdvanceSpeed(picker)">
            </ListPicker>
        </StackLayout>
    </StackLayout>
</TabView>
`, // tslint:enable max-line-length
})
export default class SettingsComponent implements OnInit {
    public actionBarColor: string = COLOR_PALETTE['dark-primary-color'];
    public actionBarDisabledTextColor: Color = new Color(54, 0, 0, 0);
    public autoAdvanceSpeedLabels: Array<string> = [
        'No auto-advance',
        '3 seconds',
        '5 seconds',
        '7 seconds',
        '10 seconds',
    ];
    private autoAdvanceSpeedValues: Array<number> = [
        0,
        3,
        5,
        7,
        10,
    ];

    public selectedLanguage$: Observable<string>;
    public availableWordTypes$: Observable<any>;
    public atLeastOneWordTypeSelected$: Observable<boolean>;
    public numberOfCards$: Observable<number>;
    public autoAdvanceSpeed$: Observable<number>;


    constructor(private service: SettingsService) {
        this.selectedLanguage$ = service.state$
            .map((s: ISettingsState) => capitalize(s.selectedLanguage));
        this.availableWordTypes$ = service.state$
            .map((s: ISettingsState) => s.availableWordTypes);
        this.numberOfCards$ = service.state$.map((s: ISettingsState) => s.numberOfCards);
        this.autoAdvanceSpeed$ = service.state$
            .map((s: ISettingsState) => this.autoAdvanceSpeedValues.indexOf(s.autoAdvanceSpeed));
        this.atLeastOneWordTypeSelected$ = service.state$
            .map((s: ISettingsState) => s.atLeastOneWordTypeSelected);
    }

    public ngOnInit(): void {
        this.service.initialize();
    }

    public toggleIncludeType(wordType: string): void {
        console.log('toggleIncludeType: ' + wordType);
        this.service.toggleInclusionOfWordType(wordType);
    }

    public setNumberOfCards(numberOfCards: number): void {
        this.service.setNumberOfCards(Math.round(numberOfCards));
    }

    public setAutoAdvanceSpeed(picker: any): void {
        this.service.setAutoAdvanceSpeed(this.autoAdvanceSpeedValues[picker.selectedIndex]);
    }

    public start(): void {
        this.service.start();
    }

    public goBack(): void {
        this.service.goBack();
    }
}
