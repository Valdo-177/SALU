import { NextResponse } from "next/server";
import { db } from "@/lib/firebase/config";
import { collection, addDoc, } from "firebase/firestore";
import { sendVerificationEmail } from "@/utils/mailMannager";

function generateCode(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Generate a 4-digit code
    const code = generateCode();
    
    // Set expiration time (30 minutes from now)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 30);

    // Save to Firebase
    const docRef = await addDoc(collection(db, "verification_codes"), {
      email,
      code,
      createdAt: new Date(),
      expiresAt,
      used: false
    });

    // Send email
    await sendVerificationEmail(email, code);

    return NextResponse.json({ 
      message: "Verification code sent",
      id: docRef.id 
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to send verification code: ${error}` }, 
      { status: 500 }
    );
  }
}