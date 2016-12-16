import IHomeState from './pages/home/home.state';
import ISettingsState from './pages/settings/settings.state';
import IFlashCardsState from './pages/flashcards/flashcards.state';


interface IAppState {
    home: IHomeState;
    settings: ISettingsState;
    flashCards: IFlashCardsState;
}
export default IAppState;
