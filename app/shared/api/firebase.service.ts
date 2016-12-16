import { Injectable } from '@angular/core';
import firebase = require('nativescript-plugin-firebase');

const noop = () => {};


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
    private keptInSync = [];

    /**
     * Checks to see if the data with the given key exists.
     *
     * @param {string} key
     * @returns {Promise<any>}
     */
    public doesDatabaseKeyExist(key: string): Promise<boolean> {
        console.log('Checking Firebase database for existence of key', key);

        return firebase.query(noop, key, {
                singleEvent: true,
                orderBy: {
                    type: firebase.QueryOrderByType.CHILD,
                    value: 'since' // mandatory when type is 'child'
                },
            }).then((result: any) => {
                if (result.error) {
                    return Promise.reject(result.error);
                }
                return result.value !== null;
            });
    }

    /**
     * Reads database from the database with the specified key once, not subscribing to changes.
     *
     * @param {string} key
     * @returns {Promise<any>}
     */
    public readDataFromDatabase(key: string): Promise<any> {
        console.log('Reading from Firebase database at key', key);

        return firebase.query(noop, key, {
                singleEvent: true,
                orderBy: {
                    type: firebase.QueryOrderByType.CHILD,
                    value: 'since' // mandatory when type is 'child'
                },
            }).then((result: any) => {
                if (result.error) {
                    return Promise.reject(result.error);
                }
                return result.value;
            });
    }

    /**
     * Downloads a local copy of the data at the given key, keeping it in sync with changes to the
     * live database silently in the background.
     *
     * @param {string} key
     * @param {boolean} turnOn
     * @returns {Promise<boolean>}
     */
    public synchronizeData(key: string, turnOn = true): Promise<boolean> {
        if (this.keptInSync.indexOf(key) > -1) {
            console.log('Firebase database at key', key, 'is already in sync');
            return Promise.resolve(true);
        }

        console.log('Calling keepInSync() on Firebase database at key', key);

        return firebase.keepInSync(key, turnOn).then(() => {
                console.log('firebase.keepInSync is ON for', key);
                this.keptInSync.push(key);
                return true;
            }, (error: any) => {
                console.log('firebase.keepInSync error:', error);
                return Promise.reject(error);
            });
    }
}
