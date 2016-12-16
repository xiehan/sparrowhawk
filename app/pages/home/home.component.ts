import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import COLOR_PALETTE from '../../shared/constants/color-palette';
import LANGUAGES from '../../shared/constants/languages';
import HomeService from './home.service';
import IHomeState from './home.state';


@Component({
    selector: 'main-menu',
    // tslint:disable max-line-length
    template: `
<ActionBar title="sparrowhawk" [backgroundColor]="actionBarColor"></ActionBar>
<FlexboxLayout flexDirection="column" alignItems="center" justifyContent="center">
    <StackLayout orientation="vertical" margin="32">
        <StackLayout orientation="horizontal" style="margin-bottom: 16;">
            <Label text="welcome to "></Label>
            <Label class="font-weight-bold" text="sparrowhawk"></Label>
        </StackLayout>
        <Label class="body" text="Please choose your language:"></Label>
    </StackLayout>
    <Button text="한국어 (Korean)" textWrap="true"
            id="korean"
            width="200"
            class="btn btn-primary text-center"
            style="margin: 16; padding: 32; font-size: 24;"
            [isEnabled]="isKoreanAvailable$ | async"
            (tap)="selectKorean()">
    </Button>
    <Button text="日本語 (Japanese)" textWrap="true"
            id="japanese"
            width="200"
            class="btn btn-primary text-center"
            style="margin: 16; padding: 32; font-size: 24;"
            [isEnabled]="isJapaneseAvailable$ | async"
            (tap)="selectJapanese()">
    </Button>
</FlexboxLayout>
`, // tslint:enable max-line-length
})
export default class HomeComponent implements OnInit {
    public actionBarColor: string = COLOR_PALETTE['dark-primary-color'];

    public isKoreanAvailable$: Observable<boolean>;
    public isJapaneseAvailable$: Observable<boolean>;
    public isLanguageSelected$: Observable<boolean>;
    public selectedLanguage$: Observable<string>;


    constructor(private service: HomeService) {
        this.isKoreanAvailable$ = service.state$.map((s: IHomeState) => s.isKoreanAvailable);
        this.isJapaneseAvailable$ = service.state$.map((s: IHomeState) => s.isJapaneseAvailable);
        this.isLanguageSelected$ = service.state$.map((s: IHomeState) => s.isLanguageSelected);
        this.selectedLanguage$ = service.state$.map((s: IHomeState) => s.selectedLanguage);
    }

    public ngOnInit(): void {
        this.service.initialize();
    }

    public selectKorean(): void {
        this.service.selectLanguage(LANGUAGES.Korean);
    }

    public selectJapanese(): void {
        this.service.selectLanguage(LANGUAGES.Japanese);
    }
}
