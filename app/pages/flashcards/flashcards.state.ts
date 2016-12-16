/**
 * @typedef {Object} FlashCardsState
 * @property {boolean} isLoading
 * @property {string} selectedLanguage
 * @property {Array<string>} selectedWordTypes
 * @property {Object} wordTypeTranslationMap
 * @property {number} numberOfCards
 * @property {number} autoAdvanceSpeed
 * @property {Array} wordList
 * @property {number} currentIndex
 * @property {Object} currentWord
 * @property {boolean} shouldShowDefinitionFirst
 * @property {boolean} shouldRevealCard
 * @property {boolean} hasCompletedAllCards
 * @property {Array<string>} missedWords
 */
interface IFlashCardsState {
    isLoading: boolean;
    selectedLanguage: string;
    selectedWordTypes: Array<string>;
    wordTypeTranslationMap: any;
    numberOfCards: number;
    autoAdvanceSpeed: number;
    wordList: Array<any>;
    currentIndex: number;
    currentWord: any;
    shouldShowDefinitionFirst: boolean;
    shouldRevealCard: boolean;
    hasCompletedAllCards: boolean;
    missedWords: Array<string>;
}

/**
 * The initial state (and general structure) of the flashCards store.
 *
 * @type {FlashCardsState}
 */
export const initialState: IFlashCardsState = Object.freeze({
    isLoading: true,
    selectedLanguage: '',
    selectedWordTypes: Object.freeze([]),
    wordTypeTranslationMap: Object.freeze({}),
    numberOfCards: 30,
    autoAdvanceSpeed: 0,
    wordList: Object.freeze([]),
    currentIndex: 0,
    currentWord: Object.freeze({}),
    shouldShowDefinitionFirst: false,
    shouldRevealCard: false,
    hasCompletedAllCards: false,
    missedWords: Object.freeze([]),
});

export default IFlashCardsState;
