import { Component } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { RouteConfig } from '@angular/router-deprecated';
import { StyleSheet } from 'react-native';
import { BackAndroid } from 'react-native/Libraries/Utilities/BackAndroid.android.js';
import { isAndroid } from 'angular2-react-native/wrapper/wrapper';
import FlashCardsComponent from './flashcards/flashcards.component';
import MainComponent from './main/main.component';
import SettingsComponent from './settings/settings.component';


@RouteConfig([
    { path: '/', component: MainComponent, name: 'MainMenu' },
    { path: '/settings', component: SettingsComponent, name: 'SettingsMenu' },
    { path: '/flashcards', component: FlashCardsComponent, name: 'FlashCards' },
])
@Component({
    selector: 'app-router',
    host: { position: 'absolute', top: '0', left: '0', bottom: '0', right: '0' },
    template: `
<View [styleSheet]="styles.container">
  <router-outlet></router-outlet>
</View>
  `,
})
export default class RouterComponent {
    public styles: any;

    constructor(private locationStrategy: LocationStrategy) {
        this.styles = StyleSheet.create({
            container: {
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'stretch',
                backgroundColor: '#EEEEEE',
            },
        });

        if (isAndroid()) {
            BackAndroid.addEventListener('hardwareBackPress', () => {
                if (this.locationStrategy.path().length > 1) {
                    this.locationStrategy.back();
                    return true;
                }
                return false;
            });
        }
    }
}
