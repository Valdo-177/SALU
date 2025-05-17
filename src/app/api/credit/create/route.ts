import { NextResponse } from "next/server";
import { db } from "@/lib/firebase/config";
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { email } = data;

    // Verificar si ya existe una solicitud con este correo
    const q = query(
      collection(db, "solicitud_credito"),
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const existingData = doc.data();

      // Verificar si todos los campos requeridos están completos
      const requiredFields = [
        "fullName",
        "idNumber",
        "gender",
        "email",
        "birthDate",
        "position",
        "specialty",
        "appointmentDate",
        "appointmentTime"
      ];

      const isComplete = requiredFields.every(field => existingData[field]);

      if (isComplete) {
        return NextResponse.json({
          error: "Ya existe una solicitud completa para este correo",
          status: "complete",
          id: doc.id,
        }, { status: 400 });
      }

      // Si existe pero no está completa, retornar el ID existente
      return NextResponse.json({
        id: doc.id,
        message: "Solicitud existente encontrada",
        data: existingData,
      });
    }

    // Si no existe, crear nueva solicitud
    const docRef = await addDoc(collection(db, "solicitud_credito"), {
      ...data,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json({
      id: docRef.id,
      message: "Solicitud creada exitosamente",
      data: { ...data, id: docRef.id }
    });
  } catch (error) {
    console.error('Create application error:', error);
    return NextResponse.json(
      { error: "Failed to create application" },
      { status: 500 }
    );
  }
}