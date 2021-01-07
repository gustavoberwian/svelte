  import firebase from 'firebase/app';

  import 'firebase/firestore';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyC6oXspIrPCIsq0MRtSLAxJGF74tdt9HgM",
    authDomain: "template-master-d9924.firebaseapp.com",
    projectId: "template-master-d9924",
    storageBucket: "template-master-d9924.appspot.com",
    messagingSenderId: "609435522563",
    appId: "1:609435522563:web:56e51d5a167b0e8025a036"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export const db = firebase.firestore();
