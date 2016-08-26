/* global jasmine, __karma__, System */

window.global = window;
Error.stackTraceLimit = Infinity;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

__karma__.loaded = function onKarmaLoaded() {
};


function isJsFile(path) {
    return path.slice(-3) === '.js';
}

function isSpecFile(path) {
    return path.slice(-8) === '.spec.js';
}

function isBuiltFile(path) {
    const builtPath = '/base/dist/';
    return isJsFile(path) && (path.substr(0, builtPath.length) === builtPath);
}

const allSpecFiles = Object.keys(window.__karma__.files)
  .filter(isSpecFile)
  .filter(isBuiltFile);

// Load our SystemJS configuration.
System.config(
    {
        defaultJSExtensions: true,
        map: {
            '@angular': 'base/node_modules/@angular',
            '@ngrx': 'base/node_modules/@ngrx',
            firebase: 'base/node_modules/firebase',
            'react-native': 'base/node_modules/angular2-react-native/test_helpers/mock_react_native.js',
            rxjs: 'base/node_modules/rxjs',
        },
        packages: {
            'angular2-react-native': {
                defaultJSExtensions: true,
                main: 'testing.js',
            },
            '@angular/core': {
                main: 'index.js',
                defaultExtension: 'js',
            },
            '@angular/compiler': {
                main: 'index.js',
                defaultExtension: 'js',
            },
            '@angular/common': {
                main: 'index.js',
                defaultExtension: 'js',
            },
            '@angular/platform-browser': {
                main: 'index.js',
                defaultExtension: 'js',
            },
            '@angular/platform-browser-dynamic': {
                main: 'index.js',
                defaultExtension: 'js',
            },
            '@angular/http': {
                main: 'index.js',
                defaultExtension: 'js',
            },
            '@angular/router-deprecated': {
                main: 'index.js',
                defaultExtension: 'js',
            },
            '@ngrx/core': {
                main: 'index.js',
                format: 'cjs'
            },
            '@ngrx/store': {
                main: 'index.js',
                format: 'cjs'
            },
            firebase: {
                defaultExtension: 'js',
                main: 'firebase-react-native.js',
            },
            rxjs: {
                defaultExtension: 'js',
            },
        },
    });

Promise.all([
    System.import('@angular/core/testing'),
    System.import('@angular/platform-browser-dynamic/testing'),
]).then(function configureTestProviders(providers) {
    const testing = providers[0];
    const testingBrowser = providers[1];

    testing.setBaseTestProviders(testingBrowser.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
    testingBrowser.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);
}).then(function loadAllSpecFiles() {
    // Finally, load all spec files.
    // This will run the tests directly.
    return Promise.all(allSpecFiles.map(function (moduleName) {
        return System.import(moduleName);
    }));
}).then(__karma__.start, __karma__.error);
