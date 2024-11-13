import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCjQ4-VMpKz5rMXwiBvvRYdeJGVCUS30SU",
  authDomain: "projeto-barbearia-49fc6.firebaseapp.com",
  projectId: "projeto-barbearia-49fc6",
  storageBucket: "projeto-barbearia-49fc6.appspot.com",
  messagingSenderId: "847828199008",
  appId: "1:847828199008:web:62c9fafda3fbe0b0228505"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Configurações adicionais do provedor Google
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { auth, db, googleProvider };