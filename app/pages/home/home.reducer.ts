import { ActionReducer, Action } from '@ngrx/store';
import ActionTypes from '../../shared/constants/action-types';
import IHomeState, { initialState } from './home.state';


const homeReducer: ActionReducer<IHomeState> = (state: IHomeState = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.KOREAN_AVAILABILITY_UPDATED:
            return (<any>Object).assign({}, state, {
                isKoreanAvailable: action.payload,
            });

        case ActionTypes.JAPANESE_AVAILABILITY_UPDATED:
            return (<any>Object).assign({}, state, {
                isJapaneseAvailable: action.payload,
            });

        case ActionTypes.LANGUAGE_SELECTED:
            return (<any>Object).assign({}, state, {
                isLanguageSelected: true,
                selectedLanguage: action.payload,
            });

        default:
            return state;
    }
};
export default homeReducer;
