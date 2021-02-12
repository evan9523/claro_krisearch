import firebase from "firebase";

const config ={
    // apiKey: "AIzaSyB5JDxo5zw-8iIGx32LIxYbOFEIxL6-BeU",
    // authDomain: "fbpauth.firebaseapp.com",
    // projectId: "fbpauth",
    // storageBucket: "fbpauth.appspot.com",
    // messagingSenderId: "950860507824",
    // appId: "1:950860507824:web:d8f7b06916d3075e75e975"
    apiKey: "AIzaSyCx6yWRJshRYo8dYyShWDruWlrXt_eL7Io",
    authDomain: "krisearch-5a05d.firebaseapp.com",
    projectId: "krisearch-5a05d",
    storageBucket: "krisearch-5a05d.appspot.com",
    messagingSenderId: "976628563758",
    appId: "1:976628563758:web:5ecf6cd6bab45e920c04bf",
    measurementId: "G-NZ5VYEJE75"
}

firebase.initializeApp(config);
export default firebase;