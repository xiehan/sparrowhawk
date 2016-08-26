import { Component } from '@angular/core';
import MainComponent from './main.component';
import {
    configureTestingModule,
    initTest,
    MockReactNativeWrapper,
    Node,
    fireGesture,
} from 'angular2-react-native/testing';


/** @test {MainComponent} */
describe('MainComponent', () => {
    const mockDatabaseService = jasmine.createSpyObj('DatabaseService',
        ['initialize', 'checkIfLanguageIsAvailable']);

    let mock: MockReactNativeWrapper = new MockReactNativeWrapper();
    let mainComponent: MainComponent;


    beforeEach(() => {
        mock.reset();
        configureTestingModule(mock, TestComponent);

        mainComponent = new MainComponent(mockDatabaseService);
    });

    afterEach(() => {
        mockDatabaseService.initialize.calls.reset();
        mockDatabaseService.checkIfLanguageIsAvailable.calls.reset();
    });


    /** @test {MainComponent#ngOnInit} */
    describe('ngOnInit', () => {
        it('should call initialize() in the DatabaseService', () => {
            mainComponent.ngOnInit();

            expect(mockDatabaseService.initialize).toHaveBeenCalledTimes(1);
            expect(mockDatabaseService.initialize).toHaveBeenCalledWith();
        });
    });


    /** @test {MainComponent#checkKoreanAvailability} */
    describe('checkKoreanAvailability', () => {
        beforeEach(() => {
            mockDatabaseService.checkIfLanguageIsAvailable
                .and.callFake(() => Promise.resolve(true));
        });

        it('should call checkIfLanguageIsAvailable() in the DatabaseService', () => {
            mainComponent.checkKoreanAvailability();

            expect(mockDatabaseService.checkIfLanguageIsAvailable).toHaveBeenCalledTimes(1);
            expect(mockDatabaseService.checkIfLanguageIsAvailable).toHaveBeenCalledWith('korean');
        });
    });


    xit('should render', () => {
        const {fixture, rootRenderer} = initTest(TestComponent, `<main-app></main-app>`);
        /* tslint:disable:max-line-length */
        expect(mock.root.toString()).toEqual(
            `root:{}
  test-cmp:{}
    main-app:{"bottom":0,"left":0,"position":"absolute","right":0,"top":0}
      native-view:{"position":"absolute","left":0,"right":0,"top":0,"bottom":0,"justifyContent":"center","alignItems":"center","backgroundColor":"#F5FCFF"}
        native-text:{"fontSize":20,"textAlign":"center","margin":10}
          native-rawtext:{"text":"Welcome to Sparrowhawk!"}
        native-text:{"textAlign":"center","color":"#333333","marginBottom":5}
          native-rawtext:{"text":"To show the dev menu, shake the device or press menu button on Android, or cmd + D on iOS"}
        native-text:{"testID":"Show_More","width":100,"textAlign":"center","textAlignVertical":"center","backgroundColor":"#32BAF5","padding":10,"margin":20,"color":"white"}
          native-rawtext:{"text":"Show more"}
      native-image:{"loadingIndicatorSrc":null,"src":[{"uri":"./../../assets/angular.png"}],"height":100,"width":100,"overflow":"hidden","position":"absolute","bottom":0,"left":0}
      native-image:{"loadingIndicatorSrc":null,"src":[{"uri":"./../../assets/react.png"}],"height":100,"width":100,"overflow":"hidden","position":"absolute","bottom":0,"right":0}`
        );
        /* tslint:enable:max-line-length */

        mock.clearLogs();
        let target = <Node> fixture.nativeElement.getElementByTestId('Show_More').children[0];
        fireGesture('tap', target);

        fixture.detectChanges();
        rootRenderer.executeCommands();
        /* tslint:disable:max-line-length */
        expect(mock.commandLogs.toString()).toEqual('UPDATE+9+native-text+{"opacity":0.5},UPDATE+9+native-text+{"opacity":1},' +
            'CREATE+13+native-text+{"textAlign":"center","color":"#333333","marginBottom":5},' +
            'CREATE+14+native-rawtext+{"text":"To get really more, it\'s time to start coding!"},' +
            'UPDATE+10+native-rawtext+{"text":"Hide more"},' +
            'ATTACH+13+14+0,ATTACH+4+13+3');
        /* tslint:enable:max-line-length */
    });
});

@Component({
    selector: 'test-cmp',
    template: `to be overriden`,
    directives: [MainComponent],
})
class TestComponent {
}
