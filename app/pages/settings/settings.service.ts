import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import IAppState from '../../app.state';
import DatabaseService from '../../shared/api/database.service';
import SettingsActions from './settings.actions';
import ISettingsState from './settings.state';


@Injectable()
/**
 * The service layer that accompanies {@link SettingsComponent}
 */
export default class SettingsService {
    public state$: Observable<ISettingsState>;

    private selectedLanguage: string;
    private isAbleToStart: boolean;


    /**
     * Constructs an instance of the service for consumption
     *
     * @param {Store} store
     * @param {Router} router
     * @param {DatabaseService} databaseService
     */
    constructor(private store: Store<IAppState>, private router: Router,
                private databaseService: DatabaseService) {
        this.state$ = <Observable<ISettingsState>> store.select('settings');

        this.state$.map((s: ISettingsState) => s.selectedLanguage)
            .distinctUntilChanged()
            .subscribe((selectedLanguage: string) => {
                this.selectedLanguage = selectedLanguage;
                this.getAvailableWordTypes();
            });

        this.state$.map((s: ISettingsState) => s.atLeastOneWordTypeSelected)
            .distinctUntilChanged()
            .subscribe((atLeastOneWordTypeSelected: boolean) => {
                this.isAbleToStart = atLeastOneWordTypeSelected;
            });
    }

    public initialize(): void {
        this.getAvailableWordTypes();
    }

    public toggleInclusionOfWordType(wordType: string): void {
        this.store.dispatch(SettingsActions.toggleInclusionOfWordType(wordType));
    }

    public setNumberOfCards(numberOfCards: number): void {
        this.store.dispatch(SettingsActions.setNumberOfCards(numberOfCards));
    }

    public setAutoAdvanceSpeed(autoAdvanceSpeed: number): void {
        this.store.dispatch(SettingsActions.setAutoAdvanceSpeed(autoAdvanceSpeed));
    }

    public start(): void {
        if (this.isAbleToStart) {
            this.router.navigateByUrl('/flashcards');
        }
    }

    public goBack(): void {
        this.router.navigateByUrl('/');
    }

    private getAvailableWordTypes(): void {
        if (this.selectedLanguage) {
            this.databaseService
                .downloadDictionaryForLanguage(this.selectedLanguage)
                .then(() => {
                    this.databaseService.getAvailableWordTypesForLanguage(this.selectedLanguage)
                        .then((results: any) => {
                            this.store.dispatch(SettingsActions.setWordTypesLoaded(results));
                        }).catch((err: any) => {
                        // @TODO figure out what to do here
                        console.log(err);
                    });
                });
        }
    }
}
