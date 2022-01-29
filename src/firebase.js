import firebase from "firebase";
import "firebase/auth";

export const auth = firebase
    .initializeApp({
        apiKey: "AIzaSyByaiOB5mRpNo65g6AnHtNFH0MmXM4bPh4",
        authDomain: "convo-502e5.firebaseapp.com",
        projectId: "convo-502e5",
        storageBucket: "convo-502e5.appspot.com",
        messagingSenderId: "1089563699109",
        appId: "1:1089563699109:web:d474c513c22f6e90d7aa4c",
    })
    .auth();
