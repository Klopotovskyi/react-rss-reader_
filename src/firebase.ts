import * as firebase from 'firebase';
const config = {
    apiKey: "AIzaSyAH4CuflSDPGv-ykfPYQ-hMmZWw7cxtAKE",
    authDomain: "rss-reader-676d2.firebaseapp.com",
    databaseURL: "https://rss-reader-676d2.firebaseio.com",
    projectId: "rss-reader-676d2",
    storageBucket: "rss-reader-676d2.appspot.com",
    messagingSenderId: "700125146589",
    appId: "1:700125146589:web:591982e4eb2cbcc7ea9a34"
};
firebase.initializeApp(config);
const databaseRef = firebase.database().ref();
export const streamsRef = databaseRef.child("Streams");