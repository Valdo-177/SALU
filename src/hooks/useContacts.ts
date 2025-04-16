import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export interface Contact {
  id: string;
  nombreCompleto: string;
  email: string;
  telefono: string;
  tipoUsuario: string;
  mensaje: string;
  comoNosEncontraste: string;
  fechaCreacion: Date;
}

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "contactos_clientes"),
      orderBy("fechaCreacion", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const contactsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        fechaCreacion: doc.data().fechaCreacion.toDate()
      })) as Contact[];
      
      setContacts(contactsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { contacts, loading };
}