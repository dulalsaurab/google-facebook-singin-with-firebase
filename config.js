//initialize Firebase and other variables
import React, { Component } from 'react';
import firebase from 'react-native-firebase'

export const fireBaseConfig = {
    clientId: 'something.apps.googleusercontent.com', // this can be obtained from your firebase app 
    appId: 'something:android:f99c4a1b117afb17', //from firebase app
    apiKey: 'your api key', //from firebase app 
    storageBucket: 'csca-test.appspot.com', 
    projectId: 'csca-test',
    messagingSenderId: firebase.app().options.messagingSenderId, //get default value
    databaseURL: firebase.app().options.databaseURL, //get default value
    // enable persistence by adding the below flag

    persistence: true,
};

var clientId = {
    androidClientId: "something.apps.googleusercontent.com",
    iosClientId: "something.apps.googleusercontent.com",
    // iosClientId: "767329949917-0o2p19n5ig4nnrlkc922rf5gpqmbv0es.apps.googleusercontent.com",
    // webClientId: "767329949917-hjtk5ucofb0s452ig4kcpoba26aderu9.apps.googleusercontent.com" 
    webClientId: "272769656721-5smf35mb7r9atefkvi81lmc06vpip786.apps.googleusercontent.com" //this one is from firebase very important, used by android
};

// get these parameters following the instruction in readme file or from 
// (https://github.com/invertase/react-native-firebase-starter/blob/master/README.md)](#react-native-firebase-readme)

export default clientId;


