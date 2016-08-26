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
 */
/**
 * The initial state (and general structure) of the settings store.
 *
 * @type {SettingsState}
 */
interface ISettingsState {
    selectedLanguage: string;
    availableWordTypes: Array<IWordType>;
    // atLeastOneWordTypeSelected: boolean;
}

export const initialState: ISettingsState = Object.freeze({
    selectedLanguage: '',
    availableWordTypes: Object.freeze([]),
    // atLeastOneWordTypeSelected: false,
});

export default ISettingsState;
