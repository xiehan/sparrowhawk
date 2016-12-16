import { Action } from '@ngrx/store';
import ActionTypes from '../../shared/constants/action-types';


export default class FlashCardsActions {
    public static setWordListLoaded(wordList: Array<any>): Action {
        return {
            type: ActionTypes.WORD_LIST_LOADED,
            payload: wordList,
        };
    }

    public static shuffleWordList(): Action {
        return {
            type: ActionTypes.WORD_LIST_SHUFFLED,
        };
    }

    public static clearWordList(): Action {
        return {
            type: ActionTypes.WORD_LIST_CLEARED,
        };
    }

    public static revealFlashCard(): Action {
        return {
            type: ActionTypes.FLASH_CARD_REVEALED,
        };
    }

    public static advanceFlashCard(selfReportedMissedWord?: boolean): Action {
        return {
            type: ActionTypes.FLASH_CARD_ADVANCED,
            payload: selfReportedMissedWord,
        };
    }
}
