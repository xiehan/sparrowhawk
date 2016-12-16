import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import IAppState from '../../app.state';
import DatabaseService from '../../shared/api/database.service';
import shuffle from '../../shared/utils/shuffle';
import FlashCardsActions from './flashcards.actions';
import IFlashCardsState, { initialState } from './flashcards.state';


@Injectable()
/**
 * The service layer that accompanies {@link FlashCardsComponent}
 */
export default class FlashCardsService {
    public state$: Observable<IFlashCardsState>;

    private selectedLanguage: string;
    private selectedWordTypes: Array<string>;
    private hasWordList: boolean = false;
    private currentCardIsRevealed: boolean = false;
    private numberOfCards: number = initialState.numberOfCards;
    private autoAdvanceSpeed: number = initialState.autoAdvanceSpeed;

    private autoAdvancer: any;


    /**
     * Constructs an instance of the service for consumption
     *
     * @param {Store} store
     * @param {Router} router
     * @param {DatabaseService} databaseService
     */
    constructor(private store: Store<IAppState>, private router: Router,
                private databaseService: DatabaseService) {
        this.state$ = <Observable<IFlashCardsState>> store.select('flashCards');

        this.state$.map((s: IFlashCardsState) => s.selectedLanguage)
            .distinctUntilChanged()
            .subscribe((selectedLanguage: string) => {
                this.selectedLanguage = selectedLanguage;
            });

        this.state$.map((s: IFlashCardsState) => s.selectedWordTypes)
            .distinctUntilChanged()
            .subscribe((selectedWordTypes: Array<string>) => {
                this.selectedWordTypes = selectedWordTypes;
                this.loadAvailableWords();
            });

        this.state$.map((s: IFlashCardsState) => s.wordList)
            .distinctUntilChanged()
            .subscribe((wordList: Array<any>) => {
                this.hasWordList = wordList && !!wordList.length;

                if (this.hasWordList) {
                    this.setUpAutoAdvance(false);
                }
            });

        this.state$.map((s: IFlashCardsState) => s.shouldRevealCard)
            .distinctUntilChanged()
            .subscribe((shouldRevealCard: boolean) => {
                this.currentCardIsRevealed = shouldRevealCard;
            });

        this.state$.map((s: IFlashCardsState) => s.numberOfCards)
            .distinctUntilChanged()
            .subscribe((numberOfCards: number) => {
                this.numberOfCards = numberOfCards;
            });

        this.state$.map((s: IFlashCardsState) => s.autoAdvanceSpeed)
            .distinctUntilChanged()
            .subscribe((autoAdvanceSpeed: number) => {
                this.autoAdvanceSpeed = autoAdvanceSpeed;
            });

        this.state$.map((s: IFlashCardsState) => s.hasCompletedAllCards)
            .distinctUntilChanged()
            .subscribe((hasCompletedAllCards: boolean) => {
                if (hasCompletedAllCards) {
                    this.stopAutoAdvance();
                }
            });
    }

    public initialize(): void {
        if (!this.hasWordList) {
            this.loadAvailableWords();
        }
    }

    public revealFlashCard(): void {
        this.setUpAutoAdvance(true);

        this.store.dispatch(FlashCardsActions.revealFlashCard());
    }

    public advanceFlashCard(selfReportedMissedWord?: boolean): void {
        this.setUpAutoAdvance(false);

        this.store.dispatch(FlashCardsActions.advanceFlashCard(selfReportedMissedWord));
    }

    public startOver(): void {
        this.stopAutoAdvance();

        this.store.dispatch(FlashCardsActions.shuffleWordList());
    }

    public goBack(): void {
        this.stopAutoAdvance();

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

        allWords = shuffle(allWords).slice(0, this.numberOfCards);
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

    private setUpAutoAdvance(currentCardIsRevealed: boolean): void {
        if (this.autoAdvanceSpeed > 0) {
            this.stopAutoAdvance();
            this.autoAdvancer = setTimeout(() => {
                if (currentCardIsRevealed) {
                    this.advanceFlashCard();
                } else {
                    this.revealFlashCard();
                }
            }, this.autoAdvanceSpeed * 1000);
        }
    }

    private stopAutoAdvance(): void {
        if (this.autoAdvancer) {
            clearTimeout(this.autoAdvancer);
        }
    }
}
