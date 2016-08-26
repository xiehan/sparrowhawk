import { Injectable } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import IAppState from '../app.state';
import DatabaseService from '../api/database.service';
import shuffle from '../utils/shuffle';
import FlashCardsActions from './flashcards.actions';
import IFlashCardsState from './flashcards.state';


@Injectable()
/**
 * The service layer that accompanies {@link FlashCardsComponent}
 */
export default class FlashCardsService {
    public state$: Observable<IFlashCardsState>;

    private selectedLanguage: string;
    private selectedWordTypes: Array<string>;
    private hasWordList: boolean = false;


    /**
     * Constructs an instance of the service for consumption
     *
     * @param {Store} store
     * @param {Router} router
     * @param {DatabaseService} databaseService
     */
    constructor(private store: Store<IAppState>, private router: Router,
                private databaseService: DatabaseService) {
        this.state$ = store.select('flashCards');

        this.state$.select((s: IFlashCardsState) => s.selectedLanguage)
            .subscribe((selectedLanguage: string) => {
                this.selectedLanguage = selectedLanguage;
            });

        this.state$.select((s: IFlashCardsState) => s.selectedWordTypes)
            .subscribe((selectedWordTypes: Array<string>) => {
                this.selectedWordTypes = selectedWordTypes;
                this.loadAvailableWords();
            });

        this.state$.select((s: IFlashCardsState) => s.wordList)
            .subscribe((wordList: Array<any>) => {
                this.hasWordList = wordList && !!wordList.length;
            });
    }

    public initialize(): void {
        this.databaseService.initialize();

        if (!this.hasWordList) {
            this.loadAvailableWords();
        }
    }

    public revealFlashCard(): void {
        this.store.dispatch(FlashCardsActions.revealFlashCard());
    }

    public advanceFlashCard(selfReportedMissedWord?: boolean): void {
        this.store.dispatch(FlashCardsActions.advanceFlashCard(selfReportedMissedWord));
    }

    public startOver(): void {
        this.store.dispatch(FlashCardsActions.shuffleWordList());
    }

    public goBack(): void {
        this.store.dispatch(FlashCardsActions.clearWordList());

        this.router.navigateByUrl('/settings');
    }

    private loadAvailableWords(): void {
        if (!this.selectedLanguage || !this.selectedWordTypes || !this.selectedWordTypes.length) {
            return;
        }

        let promises = [];
        this.selectedWordTypes.forEach((wordType: string) => {
            promises.push(this.databaseService.getAllWordsOfType(wordType, this.selectedLanguage));
        });

        Promise.all(promises)
            .then(this.processWordLists.bind(this))
            .catch((err) => {
                // @TODO figure out what to do here
                console.log(err);
            });
    }

    private processWordLists(results: Array<any>): void {
        let allWords = [];
        let promises = [];

        results.forEach((wordsOfType: any) => {
            allWords = allWords.concat(Object.keys(wordsOfType));
        });

        allWords = shuffle(allWords);
        allWords.forEach((word: string) => {
            promises.push(this.databaseService.lookUpWordInDictionary(word, this.selectedLanguage));
        });

        Promise.all(promises)
            .then((wordList: Array<any>) => {
                this.store.dispatch(FlashCardsActions.setWordListLoaded(wordList));
            })
            .catch((err) => {
                // @TODO figure out what to do here
                console.log(err);
            });
    }
}
