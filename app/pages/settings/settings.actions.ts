import { Action } from '@ngrx/store';
import ActionTypes from '../../shared/constants/action-types';


export default class SettingsActions {
    public static setWordTypesLoaded(wordTypes: any): Action {
        return {
            type: ActionTypes.AVAILABLE_WORD_TYPES_LOADED,
            payload: wordTypes,
        };
    }

    public static toggleInclusionOfWordType(wordType: string): Action {
        return {
            type: ActionTypes.WORD_TYPE_INCLUSION_TOGGLED,
            payload: wordType,
        };
    }

    public static setNumberOfCards(numberOfCards: number): Action {
        return {
            type: ActionTypes.NUMBER_OF_CARDS_CHANGED,
            payload: numberOfCards,
        };
    }

    public static setAutoAdvanceSpeed(autoAdvanceTime: number): Action {
        return {
            type: ActionTypes.AUTO_ADVANCE_SPEED_CHANGED,
            payload: autoAdvanceTime,
        };
    }
}
