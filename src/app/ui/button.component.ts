import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { StyleSheet } from 'react-native';
import COLOR_PALETTE from '../constants/color-palette';


@Component({
    selector: 'ui-button',
    // tslint:disable max-line-length
    template: `
<Text [styleSheet]="buttonStyle" opacityFeedback>
    <ng-content></ng-content>
</Text>
`, // tslint:enable max-line-length
})
export default class ButtonComponent implements OnInit, OnChanges {
    public buttonStyle: any;
    private styleSheet: any;

    @Input() width: number;
    @Input() height: number;
    @Input() margin: number = 8;
    @Input() paddingHorizontal: number = 16;
    @Input() paddingVertical: number = 8;
    @Input() backgroundColor: string = COLOR_PALETTE['accent-color'];
    @Input() textColor: string = COLOR_PALETTE['text-primary-color'];
    @Input() textSize: number = 14;
    @Input() raised: boolean = true;
    @Input() enabled: boolean = true;


    constructor() {
        this.updateStyles();
    }

    public ngOnInit(): void {
        this.updateStyles();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        // tslint:disable no-string-literal
        if (changes['enabled']) {
            if (changes['enabled'].currentValue === true) {
                this.buttonStyle = this.styleSheet.button;
            } else {
                this.buttonStyle = this.styleSheet.disabled;
            }
        }
        // tslint:enable no-string-literal
    }

    private updateStyles(): void {
        const baseButtonStyle = {
            flex: 1,
            backgroundColor: this.backgroundColor,
            margin: this.margin,
            paddingHorizontal: this.paddingHorizontal,
            paddingVertical: this.paddingVertical,
            borderRadius: 4,
            shadowRadius: 1,
            shadowOffset: { width: 0, height: 0.5 },
            shadowOpacity: 0.7,
            shadowColor: 'black',
            elevation: 4,
            color: this.textColor,
            fontSize: this.textSize,
            fontWeight: 'bold',
            textAlign: 'center',
            textAlignVertical: 'center',
        };
        if (this.width) {
            Object.assign(baseButtonStyle, {
                width: this.width,
            });
        }
        if (this.height) {
            Object.assign(baseButtonStyle, {
                height: this.height,
            });
        }
        if (!this.raised) {
            Object.assign(baseButtonStyle, {
                borderWidth: 0,
                borderRadius: 0,
                shadowRadius: 0,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0,
                shadowColor: 'transparent',
                elevation: 0,
            });
        }

        this.styleSheet = StyleSheet.create({
            button: baseButtonStyle,
            disabled: Object.assign({}, baseButtonStyle, {
                backgroundColor: '#DFDFDF',
                color: COLOR_PALETTE['disabled-text-color'],
                shadowOpacity: 0,
                elevation: 0,
            }),
        });

        if (this.enabled) {
            this.buttonStyle = this.styleSheet.button;
        } else {
            this.buttonStyle = this.styleSheet.disabled;
        }
    }
}
