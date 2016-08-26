import { Injectable } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import IAppState from '../app.state';
import DatabaseService from '../api/database.service';
import SettingsActions from './settings.actions';
import ISettingsState, { IWordType } from './settings.state';


@Injectable()
/**
 * The service layer that accompanies {@link SettingsComponent}
 */
export default class SettingsService {
    public state$: Observable<ISettingsState>;
    public atLeastOneWordTypeSelected$: BehaviorSubject<boolean>; // temp

    private selectedLanguage: string;
    private isAbleToStart: boolean;
    private availableWordTypes: Array<IWordType>; // temp


    /**
     * Constructs an instance of the service for consumption
     *
     * @param {Store} store
     * @param {Router} router
     * @param {DatabaseService} databaseService
     */
    constructor(private store: Store<IAppState>, private router: Router,
                private databaseService: DatabaseService) {
        this.state$ = store.select('settings');

        this.state$.select((s: ISettingsState) => s.selectedLanguage)
            .subscribe((selectedLanguage: string) => {
                this.selectedLanguage = selectedLanguage;
                this.getAvailableWordTypes();
            });

        this.state$.select((s: ISettingsState) => s.availableWordTypes)
            .subscribe((availableWordTypes: Array<IWordType>) => {
                this.availableWordTypes = availableWordTypes;
            });

        // NOTE: This obviously should be handled using state (the store) instead
        // but the array and <Switch [on]> behavior is bugged, so this is the best
        // we can do for now
        this.atLeastOneWordTypeSelected$ = new BehaviorSubject(false);
        this.atLeastOneWordTypeSelected$.subscribe((atLeastOneWordTypeSelected: boolean) => {
            this.isAbleToStart = atLeastOneWordTypeSelected;
        });
    }

    public initialize(): void {
        this.databaseService.initialize();

        this.getAvailableWordTypes();
    }

    public start(): void {
        if (this.isAbleToStart) {
            this.router.navigateByUrl('/flashcards');
        }
    }

    public toggleInclusionOfWordType(wordType: string): void {
        this.store.dispatch(SettingsActions.toggleInclusionOfWordType(wordType));

        // This shouldn't be necessary, but the universe hates me
        let atLeastOneWordTypeSelected = false;
        this.availableWordTypes = this.availableWordTypes
            .map((v: IWordType) => {
                if (v.shouldInclude) {
                    atLeastOneWordTypeSelected = true;
                }
                return v;
            });
        this.atLeastOneWordTypeSelected$.next(atLeastOneWordTypeSelected);
    }

    private getAvailableWordTypes(): void {
        if (this.selectedLanguage) {
            this.databaseService.getAvailableWordTypesForLanguage(this.selectedLanguage)
                .then((results: any) => {
                    this.store.dispatch(SettingsActions.setWordTypesLoaded(results));
                }).catch((err) => {
                    // @TODO figure out what to do here
                    console.log(err);
                });
        }
    }
}
