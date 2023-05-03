// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXju9bhgXKaspHst31w1untIlTKjAVW7U",
  authDomain: "sharecipes-b3773.firebaseapp.com",
  projectId: "sharecipes-b3773",
  storageBucket: "sharecipes-b3773.appspot.com",
  messagingSenderId: "663514370340",
  appId: "1:663514370340:web:ea05c887bc1f5fd50ae3b1",
  measurementId: "G-N0S9KY486W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
