import firebase from "firebase/app";
import 'firebase/firestore'


//config object from firebase
const firebaseConfig = {
    apiKey: "AIzaSyCWiY1OThwe7FhA5c8OmjG5qKzf09j-Eh8",
    authDomain: "cooking-site-d0180.firebaseapp.com",
    projectId: "cooking-site-d0180",
    storageBucket: "cooking-site-d0180.appspot.com",
    messagingSenderId: "511332629808",
    appId: "1:511332629808:web:c6713b9f1c1b865c659cf5"
  }


  //Init firebase

  firebase.initializeApp(firebaseConfig)

  // init services
  const projectFirestore = firebase.firestore()


  export { projectFirestore }