import { sendEmail } from "@/utils/mailMannager";
import { NextResponse } from "next/server";

interface IForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: Request) {
  console.log('Datos que llegan - ', Request)
  try {
    const Datos = await request.json();

    await sendEmail(Datos)
    return NextResponse.json({ message: "Email sended!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Internal Error: ${error}` }, { status: 500 });
  }
}


export async function GET() {
  return NextResponse.json({
    hello: 'Hla como tas ?'
  })
}