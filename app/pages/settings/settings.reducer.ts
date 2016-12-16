import { ActionReducer, Action } from '@ngrx/store';
import ActionTypes from '../../shared/constants/action-types';
import ISettingsState, { initialState, IWordType } from './settings.state';


const settingsReducer: ActionReducer<ISettingsState> = (state: ISettingsState = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.LANGUAGE_SELECTED:
            return (<any>Object).assign({}, state, {
                selectedLanguage: action.payload,
                availableWordTypes: state.selectedLanguage === action.payload ?
                    state.availableWordTypes : [],
                atLeastOneWordTypeSelected: state.selectedLanguage === action.payload ?
                    state.atLeastOneWordTypeSelected : false,
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

            return (<any>Object).assign({}, state, {
                availableWordTypes: availableWordTypes,
                atLeastOneWordTypeSelected: false,
            });

        case ActionTypes.WORD_TYPE_INCLUSION_TOGGLED:
            let atLeastOneWordTypeSelected = false;
            const updatedWordTypes = state.availableWordTypes
                .map((v: IWordType) => {
                    if (v.wordType === action.payload) {
                        v.shouldInclude = !v.shouldInclude;
                    }
                    if (v.shouldInclude) {
                        atLeastOneWordTypeSelected = true;
                    }
                    return v;
                });

            return (<any>Object).assign({}, state, {
                availableWordTypes: updatedWordTypes,
                atLeastOneWordTypeSelected: atLeastOneWordTypeSelected,
            });

        case ActionTypes.NUMBER_OF_CARDS_CHANGED:
            return (<any>Object).assign({}, state, {
                numberOfCards: action.payload,
            });

        case ActionTypes.AUTO_ADVANCE_SPEED_CHANGED:
            return (<any>Object).assign({}, state, {
                autoAdvanceSpeed: action.payload,
            });

        default:
            return state;
    }
};
export default settingsReducer;
