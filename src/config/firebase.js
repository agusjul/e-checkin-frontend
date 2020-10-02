import firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyAoXYnt1OjcVIIvgIkPs8rOXjwgD4yTzbk",
  authDomain: "checkin-app-badung.firebaseapp.com",
  databaseURL: "https://checkin-app-badung.firebaseio.com",
  projectId: "checkin-app-badung",
  storageBucket: "checkin-app-badung.appspot.com",
  messagingSenderId: "786216246121",
  appId: "1:786216246121:web:a560794b3662b32b48fbf8",
  measurementId: "G-R7XWPPDYDN"
}

firebase.initializeApp(config)
export const db = firebase.database()