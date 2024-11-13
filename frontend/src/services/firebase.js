import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

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

googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Configuração dos índices usando a sintaxe correta do Firestore v9
const setupIndexes = async () => {
  try {
    const indexesDocRef = doc(db, 'agendamentos', '--indexes--');
    await setDoc(indexesDocRef, {
      byClienteId: true,
      byDataHorario: true
    });
  } catch (error) {
    console.error('Erro ao configurar índices:', error);
  }
};

// Executar setup apenas em ambiente de desenvolvimento
if (process.env.NODE_ENV === 'development') {
  setupIndexes();
}

export { auth, db, googleProvider };