import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCjQ4-VMpKz5rMXwiBvvRYdeJGVCUS30SU",
  authDomain: "projeto-barbearia-49fc6.firebaseapp.com",
  projectId: "projeto-barbearia-49fc6",
  storageBucket: "projeto-barbearia-49fc6.appspot.com",
  messagingSenderId: "847828199008",
  appId: "1:847828199008:web:62c9fafda3fbe0b0228505"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = initializeFirestore(firebaseApp, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

export { auth, db, firebaseApp }; 