export interface IWordType {
    wordType: string;
    settingsLabel: string;
    nativeLabel: string;
    shouldInclude: boolean;
}

/**
 * @typedef {Object} SettingsState
 * @property {string} selectedLanguage
 * @property {Array} availableWordTypes
 * @property {boolean} atLeastOneWordTypeSelected
 * @property {number} numberOfCards
 * @property {number} autoAdvanceSpeed
 */
interface ISettingsState {
    selectedLanguage: string;
    availableWordTypes: Array<IWordType>;
    atLeastOneWordTypeSelected: boolean;
    numberOfCards: number;
    autoAdvanceSpeed: number;
}

/**
 * The initial state (and general structure) of the settings store.
 *
 * @type {SettingsState}
 */
export const initialState: ISettingsState = Object.freeze({
    selectedLanguage: '',
    availableWordTypes: Object.freeze([]),
    atLeastOneWordTypeSelected: false,
    numberOfCards: 30,
    autoAdvanceSpeed: 0,
});

export default ISettingsState;
