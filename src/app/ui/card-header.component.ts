import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { StyleSheet } from 'react-native';


@Component({
    selector: 'ui-card-header',
    // tslint:disable max-line-length
    template: `
<View [styleSheet]="styleSheet.container">
    <Image [styleSheet]="styleSheet.image" *ngIf="image" [source]="image"></Image>
    <View [styleSheet]="styleSheet.textContainer" *ngIf="text || subtext">
        <Text [styleSheet]="styleSheet.text" *ngIf="text">{{ text }}</Text>
        <Text [styleSheet]="styleSheet.subtext" *ngIf="subtext">{{ subtext }}</Text>
    </View>
</View>
`, // tslint:enable max-line-length
})
export default class CardHeaderComponent implements OnInit, OnChanges {
    public styleSheet: any;

    @Input() image: any;
    @Input() text: string;
    @Input() subtext: string;
    @Input() backgroundColor: string = 'transparent';


    constructor() {
        this.updateStyles();
    }

    public ngOnInit(): void {
        this.updateStyles();
    }

    public ngOnChanges(): void {
        this.updateStyles();
    }

    private updateStyles(): void {
        this.styleSheet = StyleSheet.create({
            container: {
                flex: 1,
                height: 120,
                backgroundColor: this.backgroundColor,
                borderStyle: 'solid',
                borderBottomColor: 'rgba(0, 0, 0, 0.1)',
                borderBottomWidth: this.backgroundColor === 'transparent' ? 1 : 0,
            },
            image: {
                resizeMode: 'cover',
                overflow: 'hidden',
                position: 'absolute',
                top: 0,
            },
            textContainer: {
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                padding: 16,
                backgroundColor: 'transparent',
                textAlign: 'left',
                textAlignVertical: 'bottom',
            },
            text: {
                color: this.backgroundColor === 'transparent' ? 'black' : 'white',
                fontSize: 24,
                fontWeight: 'bold',
                lineHeight: 36,
            },
            subtext: {
                color: this.backgroundColor === 'transparent' ?
                    'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                fontSize: 16,
                fontWeight: 'bold',
                lineHeight: 24,
            },
        });
    }
}
