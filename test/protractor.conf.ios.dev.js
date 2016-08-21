exports.config = {
    seleniumAddress: 'http://localhost:4723/wd/hub',

    specs: ['test/e2e/ios/**/*.spec.js'],

    capabilities: {
        browserName: '',
        platformName: 'iOS',
        platformVersion: '9.3',
        deviceName: 'iPhone Simulator',
        app: './../dist/sparrowhawk/ios/build/Build/Products/Debug-iphonesimulator/sparrowhawk.app',
    },

    onPrepare() {
        const wd = require('wd');
        const protractor = require('protractor');
        const wdBridge = require('wd-bridge')(protractor, wd);

        wdBridge.initFromProtractor(exports.config);
    },
};
