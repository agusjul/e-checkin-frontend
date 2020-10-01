import firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyC9PbBT_E_uMCnjT4P9v1S2A12kb7AnZ2U",
  authDomain: "checkin-app-dps.firebaseapp.com",
  databaseURL: "https://checkin-app-dps.firebaseio.com",
  projectId: "checkin-app-dps",
  storageBucket: "checkin-app-dps.appspot.com",
  messagingSenderId: "450277609034",
  appId: "1:450277609034:web:afae5181284760d74020b3",
  measurementId: "G-5CBZS8MRBE"
}

firebase.initializeApp(config)
export const db = firebase.database()