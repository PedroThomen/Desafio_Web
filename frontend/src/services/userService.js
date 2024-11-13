import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const USER_CACHE_KEY = 'user_data_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

export const getUserData = async (uid) => {
  // Verifica cache
  const cachedData = localStorage.getItem(USER_CACHE_KEY);
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }

  // Busca dados atualizados
  const userDoc = await getDoc(doc(db, 'users', uid));
  const userData = userDoc.data();

  // Atualiza cache
  localStorage.setItem(USER_CACHE_KEY, JSON.stringify({
    data: userData,
    timestamp: Date.now()
  }));

  return userData;
}; 