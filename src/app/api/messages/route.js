import dbConnect from '@/lib/dbConnect';
import Chat from '@/models/chat.model';
import { NextResponse } from 'next/server';

export async function GET() {
  console.log("GET /api/messages");
  await dbConnect();

  try {
    const messages = await Chat.find({}).sort({ createdAt: 1 });
    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(req) {
  console.log("POST /api/messages");
  await dbConnect();

  try {
    const body = await req.json();
    const message = await Chat.create(body);
    return NextResponse.json({ success: true, data: message }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
