import { Injectable } from '@angular/core';
import FirebaseService from './firebase.service';


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
    constructor(private firebaseService: FirebaseService) {}

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
}
