import { Injectable } from '@angular/core';
// import FirebaseService from './firebase.service';
import FirebaseFakeService from './firebase-fake.service';


@Injectable()
/**
 * This class abstracts out database operations so that the rest of the app is
 * not implementation-specific; we're using a Firebase real-time database for
 * now, but I don't want to preclude the possibility of switching to something
 * else in the future. Consumers of this class should be able to assume that
 * the API provided by this service is stable and won't change even if the
 * decision were made to replace Firebase with something else.
 */
export default class DatabaseService {
    /**
     * Constructs an instance of the service for consumption
     *
     * @param {FirebaseService} firebaseService
     */
    constructor(private firebaseService: FirebaseFakeService) {}

    /**
     * Initializes the service, establishing the connection to Firebase using the
     * underlying {@link FirebaseService} class.
     */
    public initialize(): void {
        this.firebaseService.initialize();
    }

    /**
     * Checks to see if the given language is available in the database.
     *
     * @param {string} language
     * @returns {Promise<boolean>}
     */
    public checkIfLanguageIsAvailable(language: string): Promise<boolean> {
        return this.firebaseService.doesDatabaseKeyExist(`languages/${language.toLowerCase()}`);
    }

    /**
     * Check to see what types of words (e.g. nouns, verbs, etc.) are available
     * for the chosen language.
     *
     * @param {string} language
     * @returns {Promise<any>}
     */
    public getAvailableWordTypesForLanguage(language: string): Promise<any> {
        return this.firebaseService.readDataFromDatabase(`${language.toLowerCase()}/labels`);
    }

    /**
     * Gets all words of the given type (e.g. nouns, verbs) from the chosen language.
     *
     * @param {string} wordType
     * @param {string} language
     * @returns {Promise<any>}
     */
    public getAllWordsOfType(wordType: string, language: string): Promise<any> {
        return this.firebaseService
            .readDataFromDatabase(`${language.toLowerCase()}/${wordType.toLowerCase()}s`);
    }

    /**
     * Looks up the given word in the dictionary of the chosen language.
     *
     * @param {string} word
     * @param {string} language
     * @returns {Promise<any>}
     */
    public lookUpWordInDictionary(word: string, language: string): Promise<any> {
        return this.firebaseService
            .readDataFromDatabase(`${language.toLowerCase()}/dictionary/${word}`);
    }
}
