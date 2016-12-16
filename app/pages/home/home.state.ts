/**
 * @typedef {Object} HomeState
 * @property {boolean} isKoreanAvailable
 * @property {boolean} isJapaneseAvailable
 * @property {boolean} isLanguageSelected
 * @property {string} selectedLanguage
 */
interface IHomeState {
    isKoreanAvailable: boolean;
    isJapaneseAvailable: boolean;
    isLanguageSelected: boolean;
    selectedLanguage: string;
}

/**
 * The initial state (and general structure) of the home store.
 *
 * @type {HomeState}
 */
export const initialState: IHomeState = Object.freeze({
    isKoreanAvailable: false,
    isJapaneseAvailable: false,
    isLanguageSelected: false,
    selectedLanguage: '',
});

export default IHomeState;
