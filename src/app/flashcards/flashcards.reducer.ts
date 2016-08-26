import { ActionReducer, Action } from '@ngrx/store';
import ActionTypes from '../constants/action-types';
import getRandomBoolean from '../utils/random-boolean';
import shuffle from '../utils/shuffle';
import IFlashCardsState, { initialState } from './flashcards.state';


const flashCardsReducer: ActionReducer<IFlashCardsState> = (state: IFlashCardsState = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.LANGUAGE_SELECTED:
            return Object.assign({}, state, {
                isLoading: true,
                selectedLanguage: action.payload,
                selectedWordTypes: [],
                wordList: [],
            });

        case ActionTypes.AVAILABLE_WORD_TYPES_LOADED:
            // @TODO When/if I figure out how to have word types enabled by default,
            // we'll want to include them all here too
            return Object.assign({}, state, {
                isLoading: true,
                selectedWordTypes: [],
                wordTypeTranslationMap: action.payload,
                wordList: [],
            });

        case ActionTypes.WORD_TYPE_INCLUSION_TOGGLED:
            let found = false;
            const selectedWordTypes = state.selectedWordTypes
                .map((s) => {
                    if (s === action.payload) {
                        found = true;
                        return null;
                    }
                    return s;
                });
            if (!found) {
                selectedWordTypes.push(action.payload);
            }

            return Object.assign({}, state, {
                isLoading: true,
                selectedWordTypes: selectedWordTypes,
                wordList: [],
            });

        case ActionTypes.WORD_LIST_LOADED:
            return Object.assign({}, state, {
                isLoading: false,
                wordList: action.payload,
                currentIndex: 0,
                currentWord: action.payload[0],
                shouldShowDefinitionFirst: getRandomBoolean(),
                shouldRevealCard: false,
                hasCompletedAllCards: false,
                missedWords: [],
            });

        case ActionTypes.WORD_LIST_SHUFFLED:
            const wordList = shuffle(state.wordList);
            return Object.assign({}, state, {
                wordList: wordList,
                currentIndex: 0,
                currentWord: wordList[0],
                shouldShowDefinitionFirst: getRandomBoolean(),
                shouldRevealCard: false,
                hasCompletedAllCards: false,
                missedWords: [],
            });

        case ActionTypes.WORD_LIST_CLEARED:
            return Object.assign({}, state, {
                isLoading: true,
                wordList: [],
                hasCompletedAllCards: false,
                missedWords: [],
            });

        case ActionTypes.FLASH_CARD_REVEALED:
            return Object.assign({}, state, {
                shouldRevealCard: true,
            });

        case ActionTypes.FLASH_CARD_ADVANCED:
            const missedWords = state.missedWords.concat([]);
            if (action.payload) {
                missedWords.push(state.wordList[state.currentIndex].display);
            }

            const index = state.currentIndex + 1;
            if (index >= state.wordList.length) {
                return Object.assign({}, state, {
                    hasCompletedAllCards: true,
                    missedWords: missedWords,
                });
            }
            return Object.assign({}, state, {
                currentIndex: index,
                currentWord: state.wordList[index],
                shouldShowDefinitionFirst: getRandomBoolean(),
                shouldRevealCard: false,
                missedWords: missedWords,
            });

        default:
            return state;
    }
};
export default flashCardsReducer;
