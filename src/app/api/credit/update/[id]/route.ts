import { NextResponse } from "next/server";
import { db } from "@/lib/firebase/config";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const { id } = params;

    const docRef = doc(db, "solicitud_credito", id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json({
      message: "Solicitud actualizada exitosamente",
      data: { ...data, id }
    });
  } catch (error) {
    console.error('Update application error:', error);
    return NextResponse.json(
      { error: "Failed to update application" },
      { status: 500 }
    );
  }
}