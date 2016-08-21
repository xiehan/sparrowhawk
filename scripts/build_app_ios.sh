#!/usr/bin/env bash

# uncomment the "OPTION 2", so the javascript bundle is used in the built app
# the packager still gets uselessly launched: https://github.com/facebook/react-native/issues/1430
sed -i '.old' -E '/^ *\/\/ *jsCodeLocation/ s/^ *\/\/*//' dist/sparrowhawk/ios/sparrowhawk/AppDelegate.m

./node_modules/.bin/gulp transpile

xctool -project dist/sparrowhawk/ios/sparrowhawk.xcodeproj/ -scheme sparrowhawk -sdk iphonesimulator9.3 clean CONFIGURATION_BUILD_DIR=$(pwd)/dist/build
xctool -project dist/sparrowhawk/ios/sparrowhawk.xcodeproj/ -scheme sparrowhawk -sdk iphonesimulator9.3 build CONFIGURATION_BUILD_DIR=$(pwd)/dist/build
zip -r dist/build/sparrowhawk.app.zip dist/build/sparrowhawk.app

# revert AppDelegate.m back to the normal development version
rm dist/sparrowhawk/ios/sparrowhawk/AppDelegate.m
mv dist/sparrowhawk/ios/sparrowhawk/AppDelegate.m.old dist/sparrowhawk/ios/sparrowhawk/AppDelegate.m
