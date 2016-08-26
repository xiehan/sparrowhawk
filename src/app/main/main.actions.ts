import { Action } from '@ngrx/store';
import ActionTypes from '../constants/action-types';


export default class MainActions {
    public static updateKoreanAvailability(isAvailable: boolean): Action {
        return {
            type: ActionTypes.KOREAN_AVAILABILITY_UPDATED,
            payload: isAvailable,
        };
    }

    public static updateJapaneseAvailability(isAvailable: boolean): Action {
        return {
            type: ActionTypes.JAPANESE_AVAILABILITY_UPDATED,
            payload: isAvailable,
        };
    }

    public static selectLanguage(selectedLanguage: string): Action {
        return {
            type: ActionTypes.LANGUAGE_SELECTED,
            payload: selectedLanguage,
        };
    }
}
