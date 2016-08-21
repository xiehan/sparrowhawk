import { Component } from '@angular/core';
import helloStylesheet from './hello.styles';


@Component({
    selector: 'hello-app',
    host: {position: 'absolute', top: '0', left: '0', bottom: '0', right: '0'},
    template: `
<View [styleSheet]="styles.container">
  <Text [styleSheet]="styles.welcome">
    Welcome to Sparrowhawk!
  </Text>
  <Text [styleSheet]="styles.instructions">
    To show the dev menu, shake the device or press menu button on Android, or cmd + D on iOS
  </Text>
  <Text [styleSheet]="styles.button" opacityFeedback (tap)="showMore=!showMore" testID="Show_More">
    {{showMore ? 'Hide more' : 'Show more'}}
  </Text>
  <Text *ngIf="showMore" [styleSheet]="styles.instructions">
    To get really more, it's time to start coding!
  </Text>
</View>
<Image [styleSheet]="styles.image" [style]="{left: 0}" [source]="angularLogo"></Image>
<Image [styleSheet]="styles.image" [style]="{right: 0}" [source]="reactLogo" ></Image>
`,
})
export default class HelloAppComponent {
    angularLogo: any = require('./../../assets/angular.png');
    reactLogo: any = require('./../../assets/react.png');
    showMore: boolean = false;
    styles: any;

    constructor() {
        this.styles = helloStylesheet;
    }
}
