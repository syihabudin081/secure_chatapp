// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlTcpOSvjEHMnv0OG-8u_-FKVSQyCCWKY",
  authDomain: "chatapp-5a351.firebaseapp.com",
  projectId: "chatapp-5a351",
  storageBucket: "chatapp-5a351.appspot.com",
  messagingSenderId: "355734595731",
  appId: "1:355734595731:web:cc74eb159f7b23aea88566"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
