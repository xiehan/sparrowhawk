import IMainState from './main/main.state';
import ISettingsState from './settings/settings.state';
import IFlashCardsState from './flashcards/flashcards.state';


interface IAppState {
    main: IMainState;
    settings: ISettingsState;
    flashCards: IFlashCardsState;
}
export default IAppState;
