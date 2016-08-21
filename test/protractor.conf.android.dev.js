exports.config = {
    seleniumAddress: 'http://localhost:4723/wd/hub',

    specs: ['test/e2e/android/**/*.spec.js'],

    capabilities: {
        browserName: '',
        platformName: 'Android',
        platformVersion: '5.1.1',
        deviceName: 'Android Emulator',
        app: './../dist/sparrowhawk/android/app/build/outputs/apk/app-debug.apk',
    },

    allScriptsTimeout: null,

    onPrepare() {
        const wd = require('wd');
        const protractor = require('protractor');
        const wdBridge = require('wd-bridge')(protractor, wd);

        wdBridge.initFromProtractor(exports.config);
    },
};
