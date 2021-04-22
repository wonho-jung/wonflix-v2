import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAdtnmvA_KzCj7SpTqiYdcQXwCyaYLoDoI",
  authDomain: "wonflix-v2.firebaseapp.com",
  projectId: "wonflix-v2",
  storageBucket: "wonflix-v2.appspot.com",
  messagingSenderId: "464032724349",
  appId: "1:464032724349:web:c920ffb1176981bf5b4814",
  measurementId: "G-BL85HHZEL0",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
