import { NextResponse } from "next/server";
import { db } from "@/lib/firebase/config";
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    const q = query(
      collection(db, "verification_codes"),
      where("email", "==", email),
      where("code", "==", code),
      where("used", "==", false)
    );

    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return NextResponse.json(
        { error: "Invalid or expired code" }, 
        { status: 400 }
      );
    }

    const verificationDoc = querySnapshot.docs[0];
    const verificationData = verificationDoc.data();

    // Check if code is expired
    if (new Date() > verificationData.expiresAt.toDate()) {
      await deleteDoc(doc(db, "verification_codes", verificationDoc.id));
      return NextResponse.json(
        { error: "Code expired" }, 
        { status: 400 }
      );
    }

    // Mark code as used
    await updateDoc(doc(db, "verification_codes", verificationDoc.id), {
      used: true
    });

    return NextResponse.json({ 
      message: "Code verified successfully" 
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Verification failed: ${error}` }, 
      { status: 500 }
    );
  }
}