import { ActionReducer, Action } from '@ngrx/store';
import ActionTypes from '../constants/action-types';
import IMainState, { initialState } from './main.state';


const mainReducer: ActionReducer<IMainState> = (state: IMainState = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.KOREAN_AVAILABILITY_UPDATED:
            return Object.assign({}, state, {
                isKoreanAvailable: action.payload,
            });

        case ActionTypes.JAPANESE_AVAILABILITY_UPDATED:
            return Object.assign({}, state, {
                isJapaneseAvailable: action.payload,
            });

        case ActionTypes.LANGUAGE_SELECTED:
            return Object.assign({}, state, {
                isLanguageSelected: true,
                selectedLanguage: action.payload,
            });

        default:
            return state;
    }
};
export default mainReducer;
