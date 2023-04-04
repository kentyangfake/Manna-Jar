// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, getDoc, doc} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithCredential} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAizA6LfYHyWib7-7cZb0LVZmpu0pa2qAo",
  authDomain: "manna-jar.firebaseapp.com",
  projectId: "manna-jar",
  storageBucket: "manna-jar.appspot.com",
  messagingSenderId: "806344207818",
  appId: "1:806344207818:web:e892e0e500e7748ed2f333",
  measurementId: "G-NB0SG7Q4HY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestore = {
  async addUser(id,name,email) {
    const db = getFirestore();
    await setDoc(doc(db, 'users', id),{
      name,
      email,
      notes:[],
    });
  },
  async getUser(id) {
    const db = getFirestore();
    const docSnap = await getDoc(doc(db, 'users', id));
    return docSnap.data();
  }
};

export const auth = {
  async signUp(email, password) {
    const auth = getAuth();
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res.user;
  },
  async login(email, password) {
    const auth = getAuth();
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  },
  async loginViaLocal(token){
    const provider = new GoogleAuthProvider();
    const credential = provider.credential(null, token);
    const auth = getAuth();
    const res = await signInWithCredential(auth,credential);
    return res.user;
  },
  async logout() {
    const auth = getAuth();
    await signOut(auth);
  },
};