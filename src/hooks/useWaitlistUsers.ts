import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export interface WaitlistUser {
  id: string;
  email: string;
  fechaRegistro: Date;
}

export function useWaitlistUsers() {
  const [users, setUsers] = useState<WaitlistUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "usuarios_espera"),
      orderBy("fechaRegistro", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const usersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        fechaRegistro: doc.data().fechaRegistro.toDate()
      })) as WaitlistUser[];
      
      setUsers(usersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { users, loading };
}