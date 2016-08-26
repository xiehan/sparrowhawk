import { Injectable } from '@angular/core';
/* tslint:disable no-var-requires */
const firebase = require('firebase');
/* tslint:enable no-var-requires */


type FirebaseConfig = {
    apiKey: string,
    databaseURL: string,
    authDomain: string,
    storageBucket: string,
}

/*
 * Ideally the below should be inside the class itself, but there's a scoping bug with Firebase:
 * https://github.com/davideast/firebase-react-native-sample/issues/14#issuecomment-239358828
 */
const firebaseConfig: FirebaseConfig = {
    apiKey: '/* @echo FIREBASE_API_KEY */',
    databaseURL: '/* @echo FIREBASE_DATABASE_URL */',
    // not used at the moment, but just in case we decide to use them in the future:
    authDomain: '/* @echo FIREBASE_AUTH_DOMAIN */',
    storageBucket: '/* @echo FIREBASE_STORAGE_BUCKET */',
};
let firebaseApp: any;
try {
    firebaseApp = firebase.initializeApp(firebaseConfig);
    console.log('Firebase app initialized');
} catch (e) {
    console.log('JS error while calling firebase.initializeApp', e);
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
    // private firebaseConfig: FirebaseConfig;
    // private firebaseApp: any;
    private firebaseDatabase: any;
    protected isInitialized: boolean = false;


    /**
     * Sets up the service, connecting to the Firebase API using their JavaScript SDK and
     * initializing our app and database connection. This service will be useless unless
     * `initialize()` is called.
     */
    public initialize(): void {
        if (!this.isInitialized) {
            try {
                // this.firebaseApp = firebase.initializeApp(firebaseConfig);
                this.firebaseDatabase = firebaseApp.database();
                this.isInitialized = true;
            } catch (e) {
                console.log('JS error while initializing Firebase connection', e);
            }
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

        console.log('Checking Firebase database for existence of key', key);

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

        console.log('Reading from Firebase database at key', key);

        return this.firebaseDatabase.ref(key)
            .once('value')
            .then((snapshot: any) => snapshot.val());
    }

    /**
     * Helper function to check if `initialize()` has been called. If not, throws an Error.
     */
    protected doIsInitializedCheck(): void {
        if (!this.isInitialized) {
            throw new Error('FirebaseService has not been initialized. Please call initialize()' +
                ' in an appropriate location in your code before calling this function.');
        }
    }
}
