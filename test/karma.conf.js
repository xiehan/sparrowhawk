module.exports = function karmaConfig(config) {
    config.set({
        basePath: '..',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        // we are building the test environment in ./spec.bundle.js
        files: [
            // Hammer.js
            { pattern: 'node_modules/hammerjs/hammer.js', included: true, watched: true },

            // Polyfills
            'node_modules/reflect-metadata/Reflect.js',

            // System.js
            'node_modules/systemjs/dist/system-polyfills.js',
            'node_modules/systemjs/dist/system.src.js',

            // Zone.js
            'node_modules/zone.js/dist/zone.js',
            'node_modules/zone.js/dist/jasmine-patch.js',
            'node_modules/zone.js/dist/async-test.js',
            'node_modules/zone.js/dist/fake-async-test.js',

            { pattern: 'node_modules/angular2-react-native/bundles/testing.dev.js', included: true, watched: true },

            // RxJs
            { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
            { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },

            { pattern: 'test/karma-test-shim.js', included: true, watched: true },

            // paths loaded via module imports
            // Angular itself
            { pattern: 'node_modules/@angular/**/*.js', included: false, watched: false },
            { pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: false },

            // Our built application code
            { pattern: 'node_modules/angular2-react-native/test_helpers/mock_react_native.js', included: false },
            { pattern: 'dist/karma/src/**/*.js', included: false, watched: false },
        ],

        // list of files to exclude
        exclude: [],

        // IMPORTANT! no need to list plugins here because Karma automatically loads any package prefixed with 'karma-'
        // plugins: [],

        // web server port
        port: 9876,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        customLaunchers: {
            ChromeNoSandbox: {
                base: 'Chrome',
                flags: ['--no-sandbox'],
            },
        },

        // test results reporter to use
        // default values (without taking into account Karma plugins): 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['nyan'],

        // don't hate. https://www.npmjs.com/package/karma-nyan-reporter
        nyanReporter: {
            // suppress the red background on errors in the error
            // report at the end of the test run
            suppressErrorHighlighting: true,
        },

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,
    });
};
