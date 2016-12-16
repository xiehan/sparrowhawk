import { Component } from '@angular/core';

import setStatusBarColors from './shared/utils/status-bar';


@Component({
    selector: 'sparrowhawk-app',
    template: `
<page-router-outlet></page-router-outlet>
`,
})
export default class AppComponent {
    constructor() {
        setStatusBarColors();
    }
}
