import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export interface WaitlistUser {
  email: string;
  fechaRegistro: Date;
}

export function useWaitlist() {
  const [loading, setLoading] = useState(false);

  const addToWaitlist = async (email: string) => {
    setLoading(true);
    try {
      await addDoc(collection(db, "usuarios_espera"), {
        email,
        fechaRegistro: new Date()
      });
      return { success: true };
    } catch (error) {
      console.error("Error adding to waitlist:", error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  return { addToWaitlist, loading };
}