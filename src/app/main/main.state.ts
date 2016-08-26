/**
 * @typedef {Object} MainState
 * @property {boolean} isKoreanAvailable
 * @property {boolean} isJapaneseAvailable
 * @property {boolean} isLanguageSelected
 * @property {string} selectedLanguage
 */
/**
 * The initial state (and general structure) of the main store.
 *
 * @type {MainState}
 */
interface IMainState {
    isKoreanAvailable: boolean;
    isJapaneseAvailable: boolean;
    isLanguageSelected: boolean;
    selectedLanguage: string;
}

export const initialState: IMainState = Object.freeze({
    isKoreanAvailable: false,
    isJapaneseAvailable: false,
    isLanguageSelected: false,
    selectedLanguage: '',
});

export default IMainState;
