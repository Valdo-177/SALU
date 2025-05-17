import { NextResponse } from "next/server";
import { db } from "@/lib/firebase/config";
import { collection, query, where, getDocs, deleteDoc } from "firebase/firestore";

export async function POST() {
  try {
    const now = new Date();
    
    // Get all expired or used codes
    const q = query(
      collection(db, "verification_codes"),
      where("expiresAt", "<", now)
    );

    const querySnapshot = await getDocs(q);

    // Delete all expired codes
    const deletePromises = querySnapshot.docs.map(doc => 
      deleteDoc(doc.ref)
    );

    await Promise.all(deletePromises);

    return NextResponse.json({ 
      message: `Cleaned up ${querySnapshot.size} expired codes` 
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Cleanup failed: ${error}` }, 
      { status: 500 }
    );
  }
}