//connect to firebase

import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAEyCBlZ-WhO5alUwR4sNQcLo8kyxyKZho",
    authDomain: "focusedflowdb.firebaseapp.com",
    projectId: "focusedflowdb",
    storageBucket: "focusedflowdb.appspot.com",
    messagingSenderId: "1025596838062",
    appId: "1:1025596838062:web:962cce1e5761df2e59dd3f"
  }


//init firebase
firebase.initializeApp(firebaseConfig)

//init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp, projectStorage }