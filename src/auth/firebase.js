import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBQ6swfdCZE7RpZCSs64h7DW8y3liW0bww",
  authDomain: "pop-project-a563c.firebaseapp.com",
  projectId: "pop-project-a563c",
  storageBucket: "pop-project-a563c.firebasestorage.app",
  messagingSenderId: "176177438041",
  appId: "1:176177438041:web:df0542153eb7343ad84048",
  measurementId: "G-X067WP4QF1"
};

// Initialize Firebase
const auth = initializeApp(firebaseConfig);
const setAuth = getAuth(auth);
export default setAuth;