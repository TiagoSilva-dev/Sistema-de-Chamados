import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

let firebaseConfig = {
  apiKey: "AIzaSyAxgQVVxTZocf71Xj-40nSHGHi_MWZttK4",
  authDomain: "sistema-3a8c4.firebaseapp.com",
  databaseURL: "https://sistema-3a8c4-default-rtdb.firebaseio.com",
  projectId: "sistema-3a8c4",
  storageBucket: "sistema-3a8c4.appspot.com",
  messagingSenderId: "51322518701",
  appId: "1:51322518701:web:0fd81012e6f1cd89c65a24"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;