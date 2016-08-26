import {Injectable} from '@angular/core';
import deepSearch from '../utils/deep-search';
import FirebaseService from './firebase.service';
import firebaseData from './firebase-export.data';


@Injectable()
/**
 * Because Firebase isn't cooperating, I'm forced to at least temporarily create this class
 * which just reads in the raw JSON file and pretends to act like the Firebase database.
 * I hate everything.
 */
export default class FirebaseFakeService extends FirebaseService {
    private database: any;

    public initialize(): void {
        if (!this.isInitialized) {
            this.database = firebaseData;
            this.isInitialized = true;
        }
    }

    public doesDatabaseKeyExist(key: string): Promise<boolean> {
        this.doIsInitializedCheck();

        console.log('Checking (fake) Firebase database for existence of key', key);

        return new Promise((resolve, reject) => {
            try {
                if (deepSearch(this.database, key)) {
                    setTimeout(() => {
                        resolve(true);
                    }, 250);
                } else {
                    setTimeout(() => {
                        resolve(false);
                    }, 250);
                }
            } catch (e) {
                reject(e);
            }
        });
    }

    public readDataFromDatabase(key: string): Promise<any> {
        this.doIsInitializedCheck();

        console.log('Reading from (fake) Firebase database at key', key);

        return new Promise((resolve, reject) => {
            try {
                const data = deepSearch(this.database, key);
                if (data) {
                    setTimeout(() => {
                        resolve(data);
                    }, 500);
                } else {
                    setTimeout(() => {
                        reject(`Data at path ${key} does not exist`);
                    }, 250);
                }
            } catch (e) {
                reject(e);
            }
        });
    }
}
