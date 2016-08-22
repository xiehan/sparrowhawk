import { Injectable } from '@angular/core';
/* tslint:disable no-var-requires */
const firebase = require('firebase/app');
require('firebase/database');
/* tslint:enable no-var-requires */


@Injectable()
export default class FirebaseService {
    private firebaseApp: any;
    private config: any;

    constructor() {
        this.config = {
            apiKey: '/* @echo FIREBASE_API_KEY */',
            databaseURL: '/* @echo FIREBASE_DATABASE_URL */',
            // not used at the moment, but just in case we decide to use them in the future:
            authDomain: '/* @echo FIREBASE_AUTH_DOMAIN */',
            storageBucket: '/* @echo FIREBASE_STORAGE_BUCKET */',
        };
    }

    public initialize() {
        this.firebaseApp = firebase.initializeApp(this.config);
    }
}
