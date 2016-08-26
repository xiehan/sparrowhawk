import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import COLOR_PALETTE from '../constants/color-palette';
import LANGUAGES from '../constants/languages';
import ButtonComponent from '../ui/button.component';
import MainService from './main.service';
import mainStylesheet from './main.styles';
import IMainState from './main.state';


@Component({
    selector: 'main-menu',
    providers: [MainService],
    directives: [ButtonComponent],
    host: { position: 'relative' },
    // tslint:disable max-line-length
    template: `
<View [styleSheet]="styles.container">
    <View [styleSheet]="styles.textContainer">
        <Text [styleSheet]="styles.welcome">
            welcome
            <Text [styleSheet]="styles.bold">sparrowhawk</Text>
        </Text>
        <Text [styleSheet]="styles.instructions">
            Please choose your language:
        </Text>
    </View>
    <ui-button testID="Korean"
               [width]="200"
               [margin]="32"
               [paddingVertical]="16"
               [backgroundColor]="buttonColor"
               [textSize]="28"
               [enabled]="isKoreanAvailable$ | async"
               (tap)="selectKorean()">
        한국어 (Korean)
    </ui-button>
    <ui-button testID="Japanese"
               [width]="200"
               [margin]="32"
               [paddingVertical]="16"
               [backgroundColor]="buttonColor"
               [textSize]="28"
               [enabled]="isJapaneseAvailable$ | async"
               (tap)="selectJapanese()">
        日本語 (Japanese)
    </ui-button>
</View>
`, // tslint:enable max-line-length
})
export default class MainComponent implements OnInit {
    public styles: any;
    public buttonColor: string = COLOR_PALETTE['dark-primary-color'];
    public isKoreanAvailable$: Observable<boolean>;
    public isJapaneseAvailable$: Observable<boolean>;
    public isLanguageSelected$: Observable<boolean>;
    public selectedLanguage$: Observable<string>;


    constructor(private service: MainService) {
        this.styles = mainStylesheet;

        this.isKoreanAvailable$ = service.state$.select((s: IMainState) => s.isKoreanAvailable);
        this.isJapaneseAvailable$ = service.state$.select((s: IMainState) => s.isJapaneseAvailable);
        this.isLanguageSelected$ = service.state$.select((s: IMainState) => s.isLanguageSelected);
        this.selectedLanguage$ = service.state$.select((s: IMainState) => s.selectedLanguage);
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
