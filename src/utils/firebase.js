import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyC7rviSr-9-85hx6jEdvIoUhp9ULKE9Vt8",
    authDomain: "discord-clone-d7329.firebaseapp.com",
    databaseURL: "https://discord-clone-d7329-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "discord-clone-d7329",
    storageBucket: "discord-clone-d7329.appspot.com",
    messagingSenderId: "90758871751",
    appId: "1:90758871751:web:9187ee4253584e474e1ce2",
    measurementId: "G-YPZE4XS1L4"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, firebaseApp };
export default db;
