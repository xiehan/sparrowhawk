#!/usr/bin/env bash

# Deactivate minifying the bundle to avoid the mangle issue
sed -i '.old' -E '/^ *minify: *!args.dev,/d' dist/sparrowhawk/node_modules/react-native/local-cli/bundle/buildBundle.js

cd ./dist/sparrowhawk/android/
./gradlew clean
./gradlew assembleRelease
cd ../../..

cp ./dist/sparrowhawk/android/app/build/outputs/apk/app-release-unsigned.apk ./dist/build
# Signing the apk with https://github.com/appium/sign
java -jar ./scripts/sign.jar ./dist/build/app-release-unsigned.apk

rm dist/sparrowhawk/node_modules/react-native/local-cli/bundle/buildBundle.js
mv dist/sparrowhawk/node_modules/react-native/local-cli/bundle/buildBundle.js.old dist/sparrowhawk/node_modules/react-native/local-cli/bundle/buildBundle.js
