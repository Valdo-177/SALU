import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0-p5SaZ-0jvUNzC4Lg_w_iD2GB-P3hQw",
  authDomain: "link-tree-3aa09.firebaseapp.com",
  projectId: "link-tree-3aa09",
  storageBucket: "link-tree-3aa09.appspot.com",
  messagingSenderId: "560933909509",
  appId: "1:560933909509:web:9f7d8ac995b1a26c90186c",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);