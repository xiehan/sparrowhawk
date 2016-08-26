import { Action } from '@ngrx/store';
import ActionTypes from '../constants/action-types';


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
}
