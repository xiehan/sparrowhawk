import { Injectable } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import IAppState from '../app.state';
import DatabaseService from '../api/database.service';
import LANGUAGES from '../constants/languages';
import MainActions from './main.actions';
import IMainState from './main.state';


@Injectable()
/**
 * The service layer that accompanies {@link MainComponent}
 */
export default class MainService {
    public state$: Observable<IMainState>;

    /**
     * Constructs an instance of the service for consumption
     *
     * @param {Store} store
     * @param {Router} router
     * @param {DatabaseService} databaseService
     */
    constructor(private store: Store<IAppState>, private router: Router,
                private databaseService: DatabaseService) {
        this.state$ = store.select('main');
    }

    public initialize(): void {
        this.databaseService.initialize();

        this.checkKoreanAvailability();
        this.checkJapaneseAvailability();
    }

    public selectLanguage(selectedLanguage: string): void {
        this.store.dispatch(MainActions.selectLanguage(selectedLanguage));

        if (selectedLanguage !== LANGUAGES.Japanese) {
            this.router.navigateByUrl('/settings');
        }
    }

    private checkKoreanAvailability(): void {
        this.databaseService.checkIfLanguageIsAvailable(LANGUAGES.Korean)
            .then((isAvailable: boolean) => {
                console.log('Korean is:', isAvailable ? 'available' : 'unavailable');
                this.store.dispatch(MainActions.updateKoreanAvailability(isAvailable));
            }).catch((err) => {
                // @TODO figure out what to do here
                console.log(err);
            });
    }

    private checkJapaneseAvailability(): void {
        this.databaseService.checkIfLanguageIsAvailable(LANGUAGES.Japanese)
            .then((isAvailable: boolean) => {
                console.log('Japanese is:', isAvailable ? 'available' : 'unavailable');
                this.store.dispatch(MainActions.updateJapaneseAvailability(isAvailable));
            }).catch((err) => {
                // @TODO figure out what to do here
                console.log(err);
            });
    }
}
