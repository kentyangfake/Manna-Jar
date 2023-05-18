import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { sampleNote } from "./sampleText";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "manna-jar.firebaseapp.com",
  projectId: "manna-jar",
  storageBucket: "manna-jar.appspot.com",
  messagingSenderId: "806344207818",
  appId: "1:806344207818:web:e892e0e500e7748ed2f333",
  measurementId: "G-NB0SG7Q4HY"
};

const app = initializeApp(firebaseConfig);

export const firestore = {
  async addUser(id,name,email) {
    const db = getFirestore();
    await setDoc(doc(db, 'users', id),{
      name,
      email,
      notes:[{
      id:'admin-tutorial',
      category:'admin',
      link_notes: [],
      create_time: 1,
      edit_time: 1,
      title:'教學筆記',
      content:sampleNote}
      ],
    });
  },
  async getUser(id) {
    const db = getFirestore();
    const docSnap = await getDoc(doc(db, 'users', id));
    return docSnap.data();
  },
  async updateUser(id, data) {
    const db = getFirestore();
    await setDoc(doc(db, 'users', id), data);
  },
  async getShareNote(user,noteId) {
    const db = getFirestore();
    const docSnap = await getDoc(doc(db, 'users', user));
    const sharedBy = docSnap.data().name;
    const noteData = docSnap.data().notes.find(note => note.id === noteId);
    const sharedNote = {...noteData,edit_time:new Date().getTime(),sharedBy,category:'shared'}
    return sharedNote;
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
  async logout() {
    const auth = getAuth();
    await signOut(auth);
  },
};