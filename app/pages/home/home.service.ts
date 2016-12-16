import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import IAppState from '../../app.state';
import DatabaseService from '../../shared/api/database.service';
import LANGUAGES from '../../shared/constants/languages';
import HomeActions from './home.actions';
import IHomeState from './home.state';


@Injectable()
/**
 * The service layer that accompanies {@link HomeComponent}
 */
export default class HomeService {
    public state$: Observable<IHomeState>;

    /**
     * Constructs an instance of the service for consumption
     *
     * @param {Store} store
     * @param {Router} router
     * @param {DatabaseService} databaseService
     */
    constructor(private store: Store<IAppState>, private router: Router,
                private databaseService: DatabaseService) {
        this.state$ = <Observable<IHomeState>> store.select('main');
    }

    public initialize(): void {
        this.checkKoreanAvailability();
        this.checkJapaneseAvailability();
    }

    public selectLanguage(selectedLanguage: string): void {
        this.store.dispatch(HomeActions.selectLanguage(selectedLanguage));

        if (selectedLanguage !== LANGUAGES.Japanese) {
            this.router.navigateByUrl('/settings');
        }
    }

    private checkKoreanAvailability(): void {
        this.databaseService.checkIfLanguageIsAvailable(LANGUAGES.Korean)
            .then((isAvailable: boolean) => {
                console.log('Korean is:', isAvailable ? 'available' : 'unavailable');
                this.store.dispatch(HomeActions.updateKoreanAvailability(isAvailable));
            }).catch((err) => {
                // @TODO figure out what to do here
                console.log(err);
            });
    }

    private checkJapaneseAvailability(): void {
        this.databaseService.checkIfLanguageIsAvailable(LANGUAGES.Japanese)
            .then((isAvailable: boolean) => {
                console.log('Japanese is:', isAvailable ? 'available' : 'unavailable');
                this.store.dispatch(HomeActions.updateJapaneseAvailability(isAvailable));
            }).catch((err) => {
                // @TODO figure out what to do here
                console.log(err);
            });
    }
}
