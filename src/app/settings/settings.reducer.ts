import { ActionReducer, Action } from '@ngrx/store';
import ActionTypes from '../constants/action-types';
import ISettingsState, { initialState, IWordType } from './settings.state';


const settingsReducer: ActionReducer<ISettingsState> = (state: ISettingsState = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.LANGUAGE_SELECTED:
            return Object.assign({}, state, {
                selectedLanguage: action.payload,
            });

        case ActionTypes.AVAILABLE_WORD_TYPES_LOADED:
            const availableWordTypes = [];

            if (action.payload) {
                for (const wordType of Object.keys(action.payload)) {
                    // @TODO fix this at the data modeling level instead
                    if (wordType === 'conjunction' || wordType === 'interjection') {
                        continue;
                    }
                    availableWordTypes.push({
                        wordType: wordType,
                        settingsLabel: `${wordType}s`,
                        nativeLabel: action.payload[wordType],
                        shouldInclude: false,
                    });
                }
            }

            return Object.assign({}, state, {
                availableWordTypes: availableWordTypes,
            });

        case ActionTypes.WORD_TYPE_INCLUSION_TOGGLED:
            // @TODO There's something going wrong with the below in tandem with <Switch [on]>
            // so, we're knowingly fudging immutability for now

            /*const updatedWordTypes = state.availableWordTypes
                .map((v: IWordType) => {
                    if (v.wordType === action.payload) {
                        v.shouldInclude = !v.shouldInclude;
                    }
                    return v;
                });

            return Object.assign({}, state, {
                availableWordTypes: updatedWordTypes,
            });*/

            state.availableWordTypes
                .forEach((v: IWordType) => {
                    if (v.wordType === action.payload) {
                        v.shouldInclude = !v.shouldInclude;
                    }
                    return v;
                });
            return state;

        case ActionTypes.NUMBER_OF_CARDS_CHANGED:
            return Object.assign({}, state, {
                numberOfCards: action.payload,
            });

        case ActionTypes.AUTO_ADVANCE_SPEED_CHANGED:
            return Object.assign({}, state, {
                autoAdvanceSpeed: action.payload,
            });

        default:
            return state;
    }
};
export default settingsReducer;
