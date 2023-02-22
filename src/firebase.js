import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyA0dWLKiylER5d3AcmcbZrBivURJvy5AmE",
  authDomain: "instagram-clone-53a89.firebaseapp.com",
  projectId: "instagram-clone-53a89",
  storageBucket: "instagram-clone-53a89.appspot.com",
  messagingSenderId: "541652429993",
  appId: "1:541652429993:web:27f0d407c6e4375f864db8",
  measurementId: "G-7ZXCKK737X",
});

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export { db, auth, storage };
