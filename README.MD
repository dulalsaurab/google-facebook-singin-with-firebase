
### Getting Started

#### 1) Clone & Install Dependencies

- 1.1) `git clone --depth 1 https://github.com/dulalsaurab/react-native-facebook-and-google-login-with-firebase.git`
- 1.2) `cd react-native-facebook-and-google-login-with-firebase` - cd into your newly created project directory.
- 1.3) Considering the sensitivity of setup and package conflict, every thing is pushed into this repo. So you should be good to execute this project once cloning the repo. 

- Installing react-native-google-signin, ios Guide
 -- This package is already install in this repo. However, some of setting may break, and you also have to generate **GoogleService-Info.plist** file for which follow the instruction on the link below. 
 - https://github.com/react-native-community/react-native-google-signin/blob/master/ios-guide.md
 - https://developers.google.com/identity/sign-in/ios/sign-in?ver=objc (google developer link for cross validation )
 - if nothing breaks, you can generate the plist file by following [this](https://github.com/react-native-community/react- -  native-google-signin/blob/master/get-config-file.md) guide. Download the GoogleService-Info.plist file at the end of the process. 

#### 3) Add `Google Services` files (plist & JSON) - copied from the original repo

- 3.1) **[iOS]** Follow the `add firebase to your app` instructions [here](https://firebase.google.com/docs/ios/setup#add_firebase_to_your_app) to generate your `GoogleService-Info.plist` file if you haven't done so already - use the package name generated previously as your `iOS bundle ID`.
- 3.2) **[iOS]** Place this file in the `ios/` directory of your project.
- 3.3) **[Android]** Follow the `manually add firebase` to your app instructions [here](https://firebase.google.com/docs/android/setup#manually_add_firebase) to generate your `google-services.json` file if you haven't done so already - use the package name generated previously as your `Android package name`.
- 3.4) **[Android]** Place this file in the `android/app/` directory of your project.
  
#### 4) Start your application

- 4.1) Before executing the app, for android, make sure your emulator tool is already running.  
- 4.1) `cd react-native-facebook-and-google-login-with-firebase` && execute `react-native run-ios` for ios devices and `react native run-android` for android devices. Also, for basic native loggin, you can execute `react-native log-ios` or `react-native log-android`.   

I am sure several things will go wrong, but if you are fortunate enough, you'll see an initial screen like the one below. 
**note:** For the debugging please see the **Issue and Debugging** section below.    

#### Screenshots


#### Issues and Debugging
Build error 'fatal error: 'RCTViewManager.h' file not found' or <React/RCTLog.h> <React/RCTBridge.h> not found
https://github.com/facebook/react-native/issues/12042 - clovos
- https://github.com/maxs15/react-native-spinkit/issues/46
