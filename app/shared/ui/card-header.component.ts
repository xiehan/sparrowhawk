import { Component, Input } from '@angular/core';
import COLOR_PALETTE from '../constants/color-palette';


@Component({
    selector: 'ui-card-header',
    // tslint:disable max-line-length
    template: `
<StackLayout orientation="horizontal" style="padding: 16 16 8;"
             [backgroundColor]="backgroundColor">
    <Image class="img-circle" *ngIf="image" [src]="image"></Image>
    <StackLayout orientation="vertical" *ngIf="text || subtext">
        <Label class="h2" *ngIf="text" [text]="text"></Label>
        <Label class="h3" opacity="0.54" *ngIf="subtext" [text]="subtext"></Label>
    </StackLayout>
</StackLayout>
`, // tslint:enable max-line-length
})
export default class CardHeaderComponent {
    @Input() backgroundColor: string;
    @Input() image: any;
    @Input() text: string;
    @Input() subtext: string;
}
