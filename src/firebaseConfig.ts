import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBBqiAmOWLhdxYcfv8nYEixtEJEIvAt-Q0",
  authDomain: "procesos-inted.firebaseapp.com",
  projectId: "procesos-inted",
  storageBucket: "procesos-inted.firebasestorage.app",
  messagingSenderId: "339528066590",
  appId: "1:339528066590:web:4608599926bfcdbc6df00f",
  measurementId: "G-H20H2ZE7ZJ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
