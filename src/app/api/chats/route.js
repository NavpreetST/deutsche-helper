import dbConnect from '@/lib/dbConnect';
import Chat from '@/models/chat.model';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();

  try {
    const chats = await Chat.find({ userId: 'admin' }).select('title createdAt').sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: chats });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const chat = await Chat.create({ ...body, userId: 'admin' });
    return NextResponse.json({ success: true, data: chat }, { status: 201 });
  } catch (error) {
    console.error("Error creating chat:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
