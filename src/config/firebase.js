import firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyAcwSFZLP8Ufqddoz3r-0Ji0osyZkoNyt4",
  authDomain: "bsand8813-coba-1.firebaseapp.com",
  databaseURL: "https://bsand8813-coba-1.firebaseio.com",
  projectId: "bsand8813-coba-1",
  storageBucket: "bsand8813-coba-1.appspot.com",
  messagingSenderId: "751217943488",
  appId: "1:751217943488:web:480822b8defb1759155e25"
}

firebase.initializeApp(config)
export const db = firebase.database()