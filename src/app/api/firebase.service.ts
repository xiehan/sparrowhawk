import { Injectable } from '@angular/core';
/* tslint:disable no-var-requires */
const firebase = require('firebase/app');
require('firebase/database');
/* tslint:enable no-var-requires */


type FirebaseConfig = {
    apiKey: string,
    databaseURL: string,
    authDomain: string,
    storageBucket: string,
}

@Injectable()
/**
 * This service class encapsulates our connection to Firebase, which we are using for their
 * real-time database product. While it is marked as `@Injectable()`, other classes should
 * typically not interact with this service directly; please use {@link DatabaseService}
 * instead. The goal is to not have other classes be dependent on the specifics of how
 * Firebase works, just in case we decide to change data providers in the future; the
 * {@link DatabaseService} class exists to abstract out the Firebase implementation specifics
 * into an API that is much less likely to change in the future.
 */
export default class FirebaseService {
    private firebaseConfig: FirebaseConfig;
    private firebaseApp: any;
    private firebaseDatabase: any;
    private isInitialized: boolean = false;


    /**
     * Constructs an instance of the service for consumption
     */
    constructor() {
        this.firebaseConfig = {
            apiKey: '/* @echo FIREBASE_API_KEY */',
            databaseURL: '/* @echo FIREBASE_DATABASE_URL */',
            // not used at the moment, but just in case we decide to use them in the future:
            authDomain: '/* @echo FIREBASE_AUTH_DOMAIN */',
            storageBucket: '/* @echo FIREBASE_STORAGE_BUCKET */',
        };
    }

    /**
     * Sets up the service, connecting to the Firebase API using their JavaScript SDK and
     * initializing our app and database connection. This service will be useless unless
     * `initialize()` is called.
     */
    public initialize(): void {
        if (!this.isInitialized) {
            this.firebaseApp = firebase.initializeApp(this.firebaseConfig);
            this.firebaseDatabase = firebase.database();
            this.isInitialized = true;
        }
    }

    /**
     * Checks to see if the data with the given key exists.
     *
     * @param {string} key
     * @returns {Promise<any>}
     * @throws {Error} if `initialize()` has not been called and Firebase is not ready for use.
     */
    public doesDatabaseKeyExist(key: string): Promise<boolean> {
        this.doIsInitializedCheck();
        return this.firebaseDatabase.ref(key)
            .once('value')
            .then((snapshot: any) => snapshot.val() !== null);
    }

    /**
     * Reads database from the database with the specified key once, not subscribing to changes.
     *
     * @param {string} key
     * @returns {Promise<any>}
     * @throws {Error} if `initialize()` has not been called and Firebase is not ready for use.
     */
    public readDataFromDatabase(key: string): Promise<any> {
        this.doIsInitializedCheck();
        return this.firebaseDatabase.ref(key)
            .once('value')
            .then((snapshot: any) => snapshot.val());
    }

    /**
     * Helper function to check if `initialize()` has been called. If not, throws an Error.
     */
    private doIsInitializedCheck(): void {
        if (!this.isInitialized) {
            throw new Error('FirebaseService has not been initialized. Please call initialize()' +
                ' in an appropriate location in your code before calling this function.');
        }
    }
}
