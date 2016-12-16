import * as application from 'application';
import * as platform from 'platform';
import * as utils from 'utils/utils';
import { Color } from 'color';

import COLOR_PALETTE from '../constants/color-palette';

declare var android: any;
declare var UIResponder: any;
declare var UIStatusBarStyle: any;
declare var UIApplication: any;
declare var UIApplicationDelegate: any;


export default function setStatusBarColors() {
    // Make the iOS status bar transparent with white text.
    // See https://github.com/burkeholland/nativescript-statusbar/issues/2
    // for details on the technique used.
    if (application.ios) {
        let AppDelegate = UIResponder.extend({
            applicationDidFinishLaunchingWithOptions: () => {
                utils.ios
                    .getter(UIApplication, UIApplication.sharedApplication)
                    .statusBarStyle = UIStatusBarStyle.LightContent;
                return true;
            }
        }, {
            name: 'AppDelegate',
            protocols: [UIApplicationDelegate]
        });
        application.ios.delegate = AppDelegate;
    }

    // See http://bradmartin.net/2016/03/10/fullscreen-and-navigation-bar-color-in-a-nativescript-android-app/
    // for details on the technique used.
    if (application.android) {
        application.android.onActivityStarted = function () {
            if (application.android && platform.device.sdkVersion >= '21') {
                let View = android.view.View;
                let window = application.android.startActivity.getWindow();
                // set the status bar to Color.Transparent
                window.setStatusBarColor(0x000000);
                window.setNavigationBarColor(new Color(COLOR_PALETTE['dark-primary-color']).android);

                let decorView = window.getDecorView();
                decorView.setSystemUiVisibility(
                    View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                    | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                    | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                    | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
            }
        };
    }
}
